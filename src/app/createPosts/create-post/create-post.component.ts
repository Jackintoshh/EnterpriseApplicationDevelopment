import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  newPost = 'Enter your message';
  private mode = 'create';
  private postID: string;
  post: Post;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postID')) {
        this.mode = 'edit';
        this.postID = paramMap.get('postID');
        this.postsService.getPost(this.postID).subscribe(postData => {
          this.post = {id: postData._id, title: postData.title, content: postData.content}
        });
      }
      else{
        this.mode = 'create';
        this.postID = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if(form.invalid)
    {
      return;
    }

    if(this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postID, form.value.title, form.value.content);
    }

    //this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();

    }
}
