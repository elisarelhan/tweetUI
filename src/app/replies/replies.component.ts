import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplyService } from '../tweetService/reply.service';
import { TweetService } from '../tweetService/tweet.service';
import { UserService } from '../tweetService/user.service';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.scss']
})
export class RepliesComponent implements OnInit {
  reply:String="";
tweetId:number=0;
tweet:any;
postReply={
  replyContent:String,
  userEmail:String
}
hashtags:[]=[];
errorMessage="";
  tweetTime: any | undefined;
  constructor(private replyService:ReplyService,
    private route: ActivatedRoute,
    private tweetService:TweetService,
    private router :Router,
    private userService:UserService) {
    this.route.params.subscribe( params => 
      this.tweetId=params.tweetId);
      this.postReply.userEmail=JSON.parse(localStorage.getItem('userData')||'{}')._userEmail;
   }

  ngOnInit(){
    this.tweetService.getTweetById(this.tweetId).subscribe(data => {
      this.tweet = data;
     this.tweetTime= this.setTweetTime();
    
     this.userService.userDetails(this.tweet.userEmail).subscribe(data=>{
          
      this.tweet.name=data.firstName+" "+data.lastName;
console.log(this.tweet);
    }
    ,(error) => {                              //Error callback
      console.log(error)
      alert("Unknown error occurred!")
     
    });
     for(let i=0;i<this.tweet.reply.length;i++)
    {
      this.tweet.reply[i].timeDiff=this.getDataDiff(new Date(this.tweet.reply[i].updatedDate), new Date());
      this.userService.userDetails(this.tweet.reply[i].userEmail).subscribe(data=>{
          
        this.tweet.reply[i].name=data.firstName+" "+data.lastName;

      }
      ,(error) => {                              //Error callback
        console.log(error)
        alert("Unknown error occurred!")
       
      });

      
    }
    console.log(this.tweet.reply);
     
    },(error) => {                              //Error callback
      console.log(error.error)
      this.errorMessage = error.error;
      alert(this.errorMessage)
    });
    
    
    
  }
  setTweetTime(){
   
console.log(this.tweet.updatedDate);
  var diff = this.getDataDiff(new Date(this.tweet.updatedDate), new Date());
  return diff;
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
  deleteReply(tweetId:number){
    this.replyService.deleteReply(tweetId).subscribe(data => {
      // this.userTweets = data;
      
      console.log(data);
      
      this.ngOnInit();
    },(error) => {                              //Error callback
      console.log(error)
      alert("Unknown error occurred!")
     
    });
  }
  updateLikes(tweetId:number)
{console.log(tweetId);
  
      let count=this.tweet.likes;
      console.log(count);
      count++;
      console.log(count);
     this.tweetService.updateLikes(tweetId,count).subscribe(data => {
       console.log("inside")
      this.tweet = data;
      
      console.log(data);
      this.ngOnInit();
    },(error) => {                              //Error callback
      console.log(error)
      alert("Unknown error occurred!")
     
    });
    }
    deleteTweet(tweetId:number){
      this.tweetService.deleteTweet(tweetId).subscribe(data => {
        // this.userTweets = data;
        
        console.log(data);
        this.tweet=null;
        this.ngOnInit();
      },(error) => {                              //Error callback
        console.log(error)
        alert("Unknown error occurred!")
       
      });
         
       
       
     
    }
    editTweet(tweetId:number){
     
          this.router.navigate(['/editTweet'],
      { queryParams: { tweet: JSON.stringify(this.tweet) }});
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
     this.postReply.replyContent=form.value.reply;
      this.replyService.postReply(this.tweetId,this.postReply).subscribe(data => {
      
       
       console.log(data);
       form.reset();
       this.ngOnInit();
      
     },(error) => {                              //Error callback
      console.log(error)
      alert("Unknown error occurred!")
     
    });
   }}

}
