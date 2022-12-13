import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TweetService } from '../tweetService/tweet.service';
import { UserService } from '../tweetService/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tweetList: any;
  userEmail:String="";
  navigationSubscription: any;
error="";
  constructor(private tweetService:TweetService,
    private userService :UserService,
    private router:Router) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.ngOnInit();
        }
      });
     }

  ngOnInit() {
    this.userEmail=JSON.parse(localStorage.getItem('userData')||'{}')._userEmail;
    this.tweetService.getAllTweets().subscribe(data=>{
      this.tweetList=data;
      for(let i=0;i<this.tweetList.length;i++)
      {
        this.tweetList[i].timeDiff=this.getDataDiff(new Date(this.tweetList[i].updatedDate),new Date());
        this.userService.userDetails(this.tweetList[i].userEmail).subscribe(data=>{
          
          this.tweetList[i].name=data.firstName+" "+data.lastName;

        }
        ,error=>{
          console.log(error.error);
          this.error=error.error;
        });
        
      }
      console.log(this.tweetList);
  
    }
    ,error=>{
      console.log(error)
      alert("Unknown error occurred!")
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
    for(let i=0;i<this.tweetList.length;i++)
    {
      if(tweetId===this.tweetList[i].tweetId)
      {
        this.router.navigate(['/editTweet'],
    { queryParams: { tweet: JSON.stringify(this.tweetList[i]) }});
      }
    }
  
  }
  deleteTweet(tweetId:number){
    this.tweetService.deleteTweet(tweetId).subscribe(data => {
      // this.userTweets = data;
      
      console.log(data);
      this.tweetList=[];
      this.ngOnInit();
    },(error) => {                              //Error callback
      console.log(error)
      alert("Unknown error occurred!")
     
    });
  }
  
  updateLikes(tweetId:number)
  {console.log(tweetId);
    for(let i=0;i<this.tweetList.length;i++)
    {
      if(tweetId===this.tweetList[i].tweetId)
      {
        let count=this.tweetList[i].likes;
        console.log(count);
        count++;
        console.log(count);
       this.tweetService.updateLikes(tweetId,count).subscribe(data => {
         console.log("inside")
        this.tweetList = data;
        
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
