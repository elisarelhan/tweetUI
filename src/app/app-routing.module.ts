import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AuthGuard } from './auth/service/auth.guard';
import { EditTweetComponent } from './edit-tweet/edit-tweet.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostTweetComponent } from './post-tweet/post-tweet.component';
import { RepliesComponent } from './replies/replies.component';
import { SearchComponent } from './search/search.component';
import { UserbyusernameComponent } from './userbyusername/userbyusername.component';
import { UserOneComponent } from './users/user-one/user-one.component';
import { UsersAllComponent } from './users/user-one/users-all/users-all.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'reset', component: ResetPasswordComponent,canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent,canActivate: [AuthGuard]},
  {
     path: 'userbyUsername', component: UserbyusernameComponent,canActivate: [AuthGuard] 
  },
  { path: 'allUsers', component:UsersAllComponent,canActivate: [AuthGuard] },
  { path: 'userOne/:email', component: UserOneComponent,canActivate: [AuthGuard],runGuardsAndResolvers: 'always'},
  { path: 'navbar', component: NavbarComponent,canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'postTweet', component: PostTweetComponent,canActivate: [AuthGuard] },
  { path: 'editTweet', component: EditTweetComponent,canActivate: [AuthGuard] },
  { path: 'reply/:tweetId', component: RepliesComponent,canActivate: [AuthGuard] },
  // {
  //   path: 'response',
  //   canActivate: [AuthGuard],
  //   // canActivateChild: [AuthGuard],
  //   component: ResponseComponent}
   
  // { path: 'not-found', component: PageNotFoundComponent },
  // { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  // { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}