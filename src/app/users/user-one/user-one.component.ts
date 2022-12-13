import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ReplyService } from 'src/app/tweetService/reply.service';
import { TweetService } from 'src/app/tweetService/tweet.service';
import { UserService } from 'src/app/tweetService/user.service';


@Component({
  selector: 'app-user-one',
  templateUrl: './user-one.component.html',
  styleUrls: ['./user-one.component.scss'],
  providers: [TweetService]
})
export class UserOneComponent implements OnInit {
 userEmail="";
  errorMessage= "";
  userDetails:any;
  userName:String="";
  error='';
  userTweets: any;
  replyCount:number=0;
  logEmail: String="";
  navigationSubscription: any;

  constructor(private route: ActivatedRoute,private http:HttpClient,private tweetService:TweetService,
    private userService:UserService,private replyService:ReplyService,private router:Router) {
    this.route.params.subscribe( params => 
      
     this.userEmail=params.email);
     this.logEmail=JSON.parse(localStorage.getItem('userData')||'{}')._userEmail;
     this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
}

  ngOnInit() {
    
console.log(this.userEmail);
this.logEmail=JSON.parse(localStorage.getItem('userData')||'{}')._userEmail;
this.getUserDetails();

  }
  getUserDetails() {
    this.userService.userDetails(this.userEmail).subscribe(data => {
      this.userDetails = data;
      
      console.log(data);
    },(error) => {                              //Error callback
      console.log(error.error)
      this.errorMessage = error.error;
      // alert(this.errorMessage)
    });
    this.tweetService.userTweets(this.userEmail).subscribe(data => {
      this.userTweets = data;
      console.log(data);
      for(let i=0;i<this.userTweets.length;i++)
      {
        this.userTweets[i].timeDiff=this.getDataDiff(new Date(this.userTweets[i].creationDate),new Date());
        this.userService.userDetails(this.userTweets[i].userEmail).subscribe(data=>{
          
          this.userTweets[i].name=data.firstName+" "+data.lastName;

        }
        ,error=>{
          
          this.error=error.error;
          console.log(this.error);
        });
      }
      
      
     
    },(error) => {                              //Error callback
      console.log(error.error)
      this.error= error.error;
      // alert(this.error)
    });

    
    }
    getDataDiff(startDate: { getTime: () => number; }, endDate: { getTime: () => number; }) {
      console.log(startDate);
      console.log(endDate);
      var diff = endDate.getTime() - startDate.getTime();
      var days = Math.floor(diff / (60 * 60 * 24 * 1000));
      var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
      var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
      var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
      if(days!=0)
      {
        return days +" days ago";
      }
      else
      { if(hours!=0)
        {
          return hours +" hrs ago";
        }
        else{
          if(minutes!=0)
          {
            return minutes +" min ago";
          }
          else{
            return seconds +" s ago";
          }
        }
      }
    }
editTweet(tweetId:number){
  for(let i=0;i<this.userTweets.length;i++)
  {
    if(tweetId===this.userTweets[i].tweetId)
    {
      this.router.navigate(['/editTweet'],
  { queryParams: { tweet: JSON.stringify(this.userTweets[i]) }});
    }
  }

}
deleteTweet(tweetId:number){
  this.tweetService.deleteTweet(tweetId).subscribe(data => {
    // this.userTweets = data;
    
    console.log(data);
    this.userTweets=[];
    this.ngOnInit();
  },(error) => {                              //Error callback
    console.log(error)
    alert("Unknown error occurred!")
   
  });
}

updateLikes(tweetId:number)
{console.log(tweetId);
  for(let i=0;i<this.userTweets.length;i++)
  {
    if(tweetId===this.userTweets[i].tweetId)
    {
      let count=this.userTweets[i].likes;
      console.log(count);
      count++;
      console.log(count);
     this.tweetService.updateLikes(tweetId,count).subscribe(data => {
       console.log("inside")
      this.userTweets = data;
      
      console.log(data);
      this.ngOnInit();
    },(error) => {                              //Error callback
      console.log(error)
      alert("Unknown error occurred!")
     
    });
    }
  }
 

}


}