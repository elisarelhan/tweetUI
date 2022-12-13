import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { TweetService } from '../tweetService/tweet.service';

@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.scss']
})
export class PostTweetComponent implements OnInit {

  post : String ="";
headers: any;
  listUsers!: any[];
  errorMessage="";
  hashtags: [] = [];
  tweet={
likes:0,
tweetContent:String,
userEmail:String

  };

  
  constructor(private http:HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private tweetService:TweetService) { 
      // this.route.params.subscribe( params => 
      //   this.tweet.userEmail=params.email);
    }

  ngOnInit(): void {
    this.headers= new HttpHeaders()
    .set('Authorization','Bearer '+ JSON.parse(localStorage.getItem('userData')||'{}')._token);
    this.tweet.userEmail=JSON.parse(localStorage.getItem('userData')||'{}')._userEmail;
  
  }
  hashtag(e: any){
  this.hashtags=e.split(" ");
  for (let i of e.split(" ")){
    console.log(i);
    if(i[0]==="#")
    {
      if(i.length>51)
      {
        this.errorMessage="Hashtag not more than 50 chars."
      }
      else{
        this.errorMessage="";
      }
      
    
    }
    
  }
  
  return this.errorMessage;
  }
  
  onSubmit(form: NgForm){
   if(form.valid){

     console.log(form.value);
    this.tweet.tweetContent=form.value.post;
     this.tweetService.postTweet(this.tweet).subscribe(data => {
     
      
      console.log(data);
      form.reset();
      this.router.navigate(['/home']);
    },(error) => {                              //Error callback
      console.log(error)
      alert("Unknown error occurred!")
});
  }
}

 
}


