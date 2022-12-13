import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AuthService } from '../auth/service/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls:['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isExpanded = true;
  
  private userSub!: Subscription;
 
email:string="";

  constructor(
   
    private authService: AuthService
  ) {}

  ngOnInit() {
    
    this.userSub = this.authService.user.subscribe(user => {
     
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
     console.log(this.isAuthenticated);

    });
    this.email=JSON.parse(localStorage.getItem('userData')||'{}')._userEmail;
    console.log(this.email);
  }

 expandMenu(){
    this.isExpanded=!this.isExpanded;
    console.log(this.isExpanded);
    // this.router.navigate(['navbar']);
  }
  
  onLogout() {
    this.authService.logout();
  }
  

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}