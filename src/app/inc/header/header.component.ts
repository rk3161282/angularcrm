import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { AuthService } from  '../../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  firstname : string;
  role : string;
  onlinestatus : string = "Available";
  break_list : any = [];
  constructor(private router: Router,  private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    var data = JSON.parse(sessionStorage.getItem('ACC_DATA'));
    this.getadminbreaklist(1,10);
    // if(data){
    //   this.firstname = data.name;
    //   this.role = data.role;
      
    // }else{
    //   this.router.navigateByUrl('/');
    // }
  }
  logout(){
    var data = JSON.parse(sessionStorage.getItem('ACC_DATA'));
    sessionStorage.removeItem('ACCESS_TOKEN');
    sessionStorage.clear();
    this.router.navigateByUrl('/');
    var uuid = data.uuid;
    this.authService.signout(uuid)
    .subscribe(data => {
      console.log(data);
      if(data.status_code == 200){
        this.toastr.error(data.status_message, '');
        sessionStorage.removeItem('ACCESS_TOKEN');
        sessionStorage.clear();
        this.router.navigateByUrl('/');
      }else{
        this.toastr.error(data.status_message, '');
        
      }
      
      
    })  
  }

  getadminbreaklist(page,limit){
  this.authService.getadminbreaklist(page,limit)
  .subscribe(data=> {
    console.log(data);
      this.break_list = data;
      debugger
  })  
}

updateuserBreak(id,name){
  console.log(id);
  this.onlinestatus = name;
   var data = JSON.parse(sessionStorage.getItem('ACC_DATA'));
   var user_id = data.users_id;
  var datastring = {
     break_id: id.toString()
  }
  debugger
  this.authService.userOnBreak(user_id,datastring)
  .subscribe(data => {
    console.log(data);
    if(data.status_code == 200){
      
 
      this.toastr.success(data.status_message, '');
      this.router.navigateByUrl('/dashboard');
    }else{
      this.toastr.error(data.status_message, '');
      this.router.navigateByUrl('/dashboard');
    }
  })  
}


}
