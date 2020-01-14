import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'mc-post-list',
  templateUrl: './post-list.component.html',
  styles: [
    `:host {
      display: block;
      margin-top: 1rem;
    }`
  ]
})

export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public  postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener().subscribe((post) => {
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
