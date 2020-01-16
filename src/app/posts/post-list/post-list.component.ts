import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import {Subscription} from 'rxjs';

@Component({
  templateUrl: './post-list.component.html',
  styles: [
    `:host {
      display: block;
      margin-top: 1rem;
    }
    mat-spinner{
      margin: auto;
    }

    .image-fix {
      width: 100%;
    }

    .image-fix img {
      width:100%;
      box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
    }
    `
  ]
})

export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;

  constructor(public  postService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener().subscribe((post) => {
      this.isLoading = false;
      this.posts = post;
    });
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  
}
