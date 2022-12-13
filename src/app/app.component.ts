import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from './auth/service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
 
})
export class AppComponent  {
  title = 'tweetUI';
  constructor(private authService: AuthService,private router:Router) {}
  isAuthenticated = false;
  isExpanded = true;
  
  private userSub!: Subscription;
  

  ngOnInit() {
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
     
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
     
    });
  }
  // expandMenu(){
  //   this.isExpanded=!this.isExpanded;
  //   console.log(this.isExpanded);
  //   this.router.navigate(['navbar']);
  // }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
 
  
  
  }

