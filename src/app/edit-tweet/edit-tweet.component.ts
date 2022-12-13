import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TweetService } from '../tweetService/tweet.service';

@Component({
  selector: 'app-edit-tweet',
  templateUrl: './edit-tweet.component.html',
  styleUrls: ['./edit-tweet.component.scss']
})
export class EditTweetComponent implements OnInit {

headers: any;
  errorMessage="";
  tweet: any;
hashtags:[]=[];
  
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
    this.route.queryParams.subscribe(
      params => {
         this.tweet = JSON.parse(params['tweet']);
         console.log(this.tweet.tweetContent);

  });
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
    this.tweet.tweetContent=form.value.edit;
     this.tweetService.updateTweet(this.tweet.tweetId,this.tweet.tweetContent).subscribe(data => {
     
      
      console.log(data);
      this.router.navigate(['home']);
      this.ngOnInit();
     
    },(error) => {                              //Error callback
      console.log(error)
      alert("Unknown error occurred!")
});
  }
}
}

