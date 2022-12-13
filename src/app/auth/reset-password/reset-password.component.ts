import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    oldpassword: new FormControl(''),
    password:new FormControl('')
  });
  error='';
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  submit(form: FormGroup,formGroupDirective:FormGroupDirective)
  {  this.error="";
  if(this.form.valid)
  {
    console.log(this.form.value);
    
    
    
    if(this.form.value.password!=this.form.value.oldpassword){
      let pattern =new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/g)
    if(pattern.test(this.form.value.password)){
      this.error="";
  return this.http.patch<any>("http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/authservice/forgotPassword",this.form.value)
  .subscribe(res=>
    {
      console.log(res);
      this.form.reset();
      formGroupDirective.resetForm();
    },
    error => {
      console.log(error.error);
      this.error = error.error;
      
      
    }
    );
  }

else{
  this.error="Password should contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.";
  return;
}
  }
  else{
this.error="Password should not be same.";
return;
  }
}
  else{
    return;
  }
}
}
