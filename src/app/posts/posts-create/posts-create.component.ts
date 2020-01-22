import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})

export class PostCreateComponent implements OnInit, OnDestroy {
  postTitle = '';
  postContent = '';
  post: Post;
  isLoading = false;
  private mode = 'create';
  private postId: string;
  private authStatus: Subscription;
  form: FormGroup;
  imagePreview: string | ArrayBuffer;


  constructor(public postService: PostService, public route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.authStatus = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    })
    this.form = new FormGroup({
      title: new FormControl('', {validators: [Validators.required, Validators.maxLength(100)]}),
      content: new FormControl('', {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            creator: postData.creator
          };
          this.form.setValue({
          title: this.post.title,
          content: this.post.content,
          image: this.post.imagePath
        });
        });

      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  imagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    // this reads the file
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    } else {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }

    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatus.unsubscribe();
  }
}
