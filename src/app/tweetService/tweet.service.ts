import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';

import { NonNullAssert } from '@angular/compiler';
import { Router } from '@angular/router';



    
    @Injectable({ providedIn: 'root' })
    export class TweetService {
    
        tweetData: []| undefined;
     
      
      
    
      constructor(private http: HttpClient) {}
        headers= new HttpHeaders()
        .set('Authorization','Bearer '+ JSON.parse(localStorage.getItem('userData')||'{}')._token);
    
      userTweets(userEmail:String) {
       return  this.http
          .get<any>('http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/api/tweet/getAllTweets'+'/'+ userEmail,{ 'headers': this.headers })
          .pipe(
            // catchError((errorMessage)=>{
            //     console.log(errorMessage);
            //  } ),
            map(res => res));
         

  }
  getTweetById(tweetId:number)
  {
   
      return  this.http
         .get<any>('http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/api/tweet/getTweet'+'/'+ tweetId,{ 'headers': this.headers })
         .pipe(
           // catchError((errorMessage)=>{
           //     console.log(errorMessage);
           //  } ),
           map(res => res));
        


  }
  updateLikes(tweetId:number, count:number)
  {
    console.log(Number.isInteger(count))
    return  this.http
          .put('http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/api/tweet/updateTweetLikes'+'/'+ tweetId,{
            likes:count
          },{ 'headers': this.headers })
          .pipe(
            map(res => res));
  }
  updateTweet(tweetId:number,tweetContent:String){
    return  this.http
    .put('http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/api/tweet/updateTweet'+'/'+ tweetId,{
      tweetContent:tweetContent
    },{ 'headers': this.headers })
    .pipe(
      map(res => res));
  }
  postTweet(tweet:any){
    return  this.http
          .post('http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/api/tweet/postTweet',tweet,{ 'headers': this.headers })
          .pipe(
            map(res => res));
  }
  deleteTweet(replyId:number)
  {
    return  this.http
          .delete('http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/api/tweet/deleteTweet'+'/'+ replyId,{ 'headers': this.headers })
          .pipe(
            map(res => res));
  }
  getAllTweets(){

return  this.http
         .get<any>('http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/api/tweet/getAllTweets',{ 'headers': this.headers })
         .pipe(
           // catchError((errorMessage)=>{
           //     console.log(errorMessage);
           //  } ),
           map(res => res));
  }
}