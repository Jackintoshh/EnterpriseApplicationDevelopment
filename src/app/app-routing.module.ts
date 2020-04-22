import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserPost } from './createPosts/list-post/list-post.component'
import { CreatePostComponent } from './createPosts/create-post/create-post.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {path: '', component: ListUserPost},
  {path: 'create', component: CreatePostComponent},
  {path: 'edit/:postID', component: CreatePostComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
