import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { RegisterUserComponent } from './register/register.component';

const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterUserComponent },
  { path: 'posts', component: PostsComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
