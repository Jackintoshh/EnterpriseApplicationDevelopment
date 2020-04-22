import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { Post } from '../post.model'
import { PostsService} from '../posts.service'
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})

export class ListGames implements OnInit, OnDestroy{
  /*posts = [
    {title: 'First Post', content: 'This is the first post\'s content'},
    {title: 'Second Post', content: 'This is the second post\'s content'},
    {title: 'Third Post', content: 'This is the third post\'s content'},
    {title: 'Fourth Post', content: 'This is the fourth post\'s content'},
  ]
  */
  posts: Post[] = [];
  private postsSub: Subscription;
  private authStatusSubscription: Subscription;
  isAuthenticated = false;

  constructor(public postsService: PostsService, private authService: AuthService) {

  }

  ngOnInit() {
    //this.posts = this.postsService.getPosts();
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
    this.isAuthenticated = this.authService.getIsAuth();
    this.authStatusSubscription = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    })
  }

  onDelete(postID: string){
    this.postsService.deletePost(postID);
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authStatusSubscription.unsubscribe();
  }
}

