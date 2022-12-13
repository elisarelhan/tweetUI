import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { UserOneComponent } from './users/user-one/user-one.component';
import { UsersAllComponent } from './users/user-one/users-all/users-all.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';

import { HomeComponent } from './home/home.component';
import { UserbyusernameComponent } from './userbyusername/userbyusername.component';
import { TweetService } from './tweetService/tweet.service';
import { PostTweetComponent } from './post-tweet/post-tweet.component';
import { EditTweetComponent } from './edit-tweet/edit-tweet.component';
import { RepliesComponent } from './replies/replies.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UsersAllComponent,
    UserOneComponent,
    SearchComponent,
    HomeComponent,
    UserbyusernameComponent,
    PostTweetComponent,
    EditTweetComponent,
    RepliesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TweetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
