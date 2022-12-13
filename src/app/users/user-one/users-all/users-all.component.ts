import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/tweetService/user.service';

@Component({
  selector: 'app-users-all',
  templateUrl: './users-all.component.html',
  styleUrls: ['./users-all.component.scss']
})
export class UsersAllComponent implements OnInit {
  listUsers: any;
  errorMessage: any;
  constructor(private userService:UserService) { }

  ngOnInit(){
    this.userService.users().subscribe(data => {
      this.listUsers = data;
      
      console.log(data);
     
    },(error) => {                              //Error callback
      console.log(error.error)
      this.errorMessage = error.error;
      alert(this.errorMessage)
    });

  }
  
  

}
