import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';

import { NonNullAssert } from '@angular/compiler';
import { Router } from '@angular/router';



    
    @Injectable({ providedIn: 'root' })
    export class ReplyService {
    
        
     
      
      
    
      constructor(private http: HttpClient) {}
        headers= new HttpHeaders()
        .set('Authorization','Bearer '+ JSON.parse(localStorage.getItem('userData')||'{}')._token);
    
      replies(tweetId:any) {
       return  this.http
          .get<any>('http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/api/tweet'+'/'+ tweetId +'/'+'replies',{ 'headers': this.headers })
          .pipe(
            // catchError((errorMessage)=>{
            //     console.log(errorMessage);
            //  } ),
            map(res => res));
         

  }
  postReply(tweetId:number,reply:any){
    return  this.http
          .post('http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/api/tweet'+'/'+ tweetId +'/'+'postReply',reply,{ 'headers': this.headers })
          .pipe(
            map(res => res));
  }
  deleteReply(replyId:number)
  {
    return  this.http
          .delete('http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/api/tweet/deleteReply'+'/'+ replyId,{ 'headers': this.headers })
          .pipe(
            map(res => res));
  }
  
}