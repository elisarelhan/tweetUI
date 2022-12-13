import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl(''),
    contactNo: new FormControl(null),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword:new FormControl('')
  });

  genders: String[]=['Male','Female'];
  error="";
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
  }

submit(form: FormGroup,formGroupDirective:FormGroupDirective)
{

  console.log(this.form.value.password)
  this.error="";
  if(this.form.valid)
  {
    let pattern =new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/g)
    if(pattern.test(this.form.value.password)){
      this.error="";
    
    
    console.log(typeof(this.form.value));
    console.log(this.form.value.password===this.form.value.confirmPassword);
  if(this.form.value.password===this.form.value.confirmPassword){
//   let det=(this.form.value);
//   let mapped = Object.keys(det).map(key => ({type: key, value: det[key]}));

// console.log(mapped);
//   console.log(mapped.slice(0,-1));
  return this.http.post<any>("http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/authservice/register",this.form.value)
  .subscribe(res=>
    {
      console.log(res);
      this.form.reset();
      formGroupDirective.resetForm();
      this.router.navigate(['/login']);
    },
    error => {
      console.log(error.error);
      this.error = error.error;
      
      
    }
    );
   
  }
  else{
    this.error="Password mismatch"
    return;
  }
}
  else{
    this.error="Password should contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.";
    return;
  }
}
  else{
    return;
  }
  
}
}


