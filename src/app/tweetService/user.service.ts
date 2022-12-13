import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';

import { NonNullAssert } from '@angular/compiler';
import { Router } from '@angular/router';



    
    @Injectable({ providedIn: 'root' })
    export class UserService {
    
        
     
      
      
    
      constructor(private http: HttpClient) {}
        headers= new HttpHeaders()
        .set('Authorization','Bearer '+ JSON.parse(localStorage.getItem('userData')||'{}')._token);
    
      userDetails(userEmail:String) {
       return  this.http
          .get<any>('http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/authservice/user'+'/'+ userEmail,{ 'headers': this.headers })
          .pipe(
            // catchError((errorMessage)=>{
            //     console.log(errorMessage);
            //  } ),
            map(res => res));
         

  }
  users(){
    return  this.http
    .get<any>('http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/authservice/getAllUsers',{ 'headers': this.headers })
    .pipe(
      map(res => res));
   
  }
  
}