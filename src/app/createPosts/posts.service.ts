import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http"
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  games: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}

  getPosts(){
    //return [...this.posts];
    this.httpClient.get<{message: string, posts: any}>('http://localhost:3000/api/posts').pipe(map((postData) =>
    {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe((changedPosts) => {
      this.posts = changedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getGames(){
    //return [...this.posts];
    this.httpClient.get<{message: string, posts: any}>('http://localhost:3000/api/posts').pipe(map((postData) =>
    {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe((changedPosts) => {
      this.posts = changedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string)
  {
    return this.httpClient.get<{_id: string; title: string; content: string;}>("http://localhost:3000/api/posts/" + id);
  }

  addPost(title: string, content: string)
  {
    const post: Post = { id: null, title: title, content: content};
    this.httpClient.post<{message: string, postID: string}>('http://localhost:3000/api/posts', post).subscribe((responseData) => {
      console.log(responseData.message);
      const postID = responseData.postID;
      post.id = postID;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });

  }

  deletePost(postID: string){
    this.httpClient.delete("http://localhost:3000/api/posts" + postID).subscribe(() => {
      console.log("Deleted");
      const updatedPosts = this.posts.filter(post => post.id !== postID);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {id: id, title: title, content: content};
    this.httpClient.put("http://localhost:3000/api/posts/" + id, post).subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
