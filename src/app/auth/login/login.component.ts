import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });
  
 expand!: true; 
  error='';
  constructor(private authService : AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  submit(form: FormGroup,formGroupDirective:FormGroupDirective)
  {
    console.log(this.form.value);
    let authObs: Observable<AuthResponseData>;

   
    
    authObs = this.authService.login(this.form.value.username,this.form.value.password);
    authObs.subscribe(
      resData => {
        console.log(resData);
       this.router.navigate(['home']);
        // this.router.navigate(['navbar'],{state:{expand: this.expand}});
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        
        
      }
    );
    this.form.reset();
    formGroupDirective.resetForm();
  }
}
