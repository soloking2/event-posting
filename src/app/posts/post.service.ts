import { Injectable } from '@angular/core';
import { Post } from './post.model';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        // mapping through each post to return the correct id from the database
        map(returnedPost => {
          return returnedPost.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
        })
      )
      .subscribe(postData => {
      this.posts = postData;
      this.postUpdated.next([...this.posts]);
    });
  }
  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    // tslint:disable-next-line: object-literal-shorthand
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });

  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      const deletedPost = this.posts.filter(post => post.id !== postId);
      this.posts = deletedPost;
      this.postUpdated.next([...this.posts]);
    });
  }
}
