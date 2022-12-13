import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { NonNullAssert } from '@angular/compiler';
import { Router } from '@angular/router';

export interface AuthResponseData {
token: string;
  expiresIn: string;
userEmail:string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null!);
  private tokenExpirationTimer: any;
  
  

  constructor(private http: HttpClient,
    private router:Router) {}

  // signup(username: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       'http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/authservice/register',
  //       {
  //         username: username,
  //         password: password,
          
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap(resData => {
  //         this.handleAuthentication(
           
  //           resData.token,
  //           +resData.expiresIn
  //         );
          
  //       })
  //     );
  // }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/authservice/login',
        {
          email: username,
          password: password,
          
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            
            resData.token,
            +resData.expiresIn,
            resData.userEmail
          );
          
        })
      );
  }
  autoLogin() {
    const userData: {
      _token: string;
      _tokenExpirationDate: string;
      _userEmail: string;
    } = JSON.parse(localStorage.getItem('userData')||'{}');
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData._userEmail
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
      
    }
  }

  logout() {
    this.user.next(null!);
    this.router.navigate(['login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
    console.log(expirationDuration);
  }
  private handleAuthentication(
  
    token: string,
    expiresIn: number,
    userEmail: string
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User( token, expirationDate,userEmail);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage='';
   console.log(errorRes);
  //   if(errorRes.error==="INVALID_CREDENTIALS"){
  //     errorMessage= "Invalid Credentials";
  //   }
  //   else{
  //   errorMessage = 'An unknown error occurred!';
  // }
  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(errorMessage);
  //   }
    switch (errorRes.error) {
      case 'INVALID_CREDENTIALS':
        errorMessage = 'Invalid Credentials';
        break;
      case 'User not found with username:':
        errorMessage = 'User does not exist';
        break;
      case 'Username already exists.':
        errorMessage = 'Username already exists';
        break;
      default:
        errorMessage = 'An unknown error occurred!';
        break;
    }
    return throwError(errorMessage);
  }
}
