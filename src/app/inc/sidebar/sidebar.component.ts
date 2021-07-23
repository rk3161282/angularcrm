import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user_id: number;
  constructor() { }

  ngOnInit(): void {
    var data = JSON.parse(sessionStorage.getItem('ACC_DATA'));
    this.user_id = data.users_id;
    debugger

  }

  public open(): void {
    const url = `http://localhost:4200/dial-pad`;
    const w = screen.width * 0.75;
    const h = screen.height * 0.75;
    // const left = (screen.width / 2) - (w / 2);
    // const top = (screen.height / 2) - (h / 2);
    const left = 10;
    const top = 10;
    const randomnumber = Math.floor((Math.random() * 100) + 1);
    // tslint:disable-next-line:max-line-length
    window.open(url, '_blank', 'PopUp' + randomnumber + ',scrollbars=0,menubar=0,resizable=1,width = ' + w + ', height = ' + h + ', top = ' + top + ', left = ' + left);
  }

}
