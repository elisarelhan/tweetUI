import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userbyusername',
  templateUrl: './userbyusername.component.html',
  styleUrls: ['./userbyusername.component.scss']
})
export class UserbyusernameComponent implements OnInit {

  listUsers: any[] = [];
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
         this.listUsers = JSON.parse(params['users']);
         console.log(this.listUsers);

      }
    )
  }

}
