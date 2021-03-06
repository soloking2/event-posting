import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import {Subscription} from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

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
    mat-paginator {
      margin: 1rem;
    }
    `
  ]
})

export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postPerPage = 2;
  currentPage = 1;
  userId: string;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSub: Subscription;
  private authStatusSubs: Subscription;
  userIsAuthenticated = false;

  constructor(public  postService: PostService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number}) => {
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
    this.userIsAuthenticated = this.authService.getAuth();
    this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postService.getPosts(this.postPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSubs.unsubscribe();
  }


}
