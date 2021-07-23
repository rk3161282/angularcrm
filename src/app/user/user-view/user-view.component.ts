import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  individualuserlist: any;
  constructor() { }

  ngOnInit(): void {
    this.individualuserlist = JSON.parse(localStorage.getItem('individualuserlist'));
    
  }

}
