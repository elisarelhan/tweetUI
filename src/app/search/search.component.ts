import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search : String ="";
headers: any;
  listUsers!: any[];
  errorMessage="";
  constructor(private http:HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.headers= new HttpHeaders()
    .set('Authorization','Bearer '+ JSON.parse(localStorage.getItem('userData')||'{}')._token);
  
  }
  
  onSubmit(form: NgForm){
   if(form.valid){
     console.log(form.value);
    return this.http
    .get<any>('http://902477-tweetapp-676037363.us-west-2.elb.amazonaws.com/authservice/userByUsername'+'/'+ form.value.search,{ 'headers': this.headers })
    .pipe(map(response=>{
      this.listUsers =response;
      
    }))
    
    .subscribe((res)=>
    { 
      console.log(this.listUsers);
      // this.router.navigate(['userbyUsername',{state:{listUsers: this.listUsers}}]);
      this.router.navigate(['/userbyUsername'], 
        { queryParams: { users: JSON.stringify(this.listUsers) }});
    }
    ,(error) => {                              //Error callback
      console.log(error.error)
      this.errorMessage = error.error;
      alert(this.errorMessage)
      

      //throw error;   //You can also throw the error to a global error handler
    });
    
   }
   else return;


}
}
