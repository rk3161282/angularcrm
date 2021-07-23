import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../user';
import { AuthService } from  '../auth.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
declare function sipRegister() : any ;

@Component({
  selector: 'app-dial-pad',
  templateUrl: './dial-pad.component.html',
  styleUrls: ['./dial-pad.component.css']
})
export class DialPadComponent implements OnInit {

  message: string = "Hola Mundo!"
  txtPhoneNumber : string ;
  showdialbox : boolean = false;
  contact_list : any = [];
  user_id : string;
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }

  sendMessage() {
    this.messageEvent.emit(this.message)
  }

  ngOnInit(): void {
    sipRegister();
    var data = JSON.parse(sessionStorage.getItem('ACC_DATA'));
    this.user_id = data.users_id;
    this.getcontact​(this.user_id);
    window.localStorage.setItem('org.doubango.identity.display_name', data.extension);
    window.localStorage.setItem('org.doubango.identity.impi', data.extension);
    window.localStorage.setItem('org.doubango.identity.impu', 'sips:'+data.extension+''+data.public_identity);
    window.localStorage.setItem('org.doubango.identity.password', data.secret);
    window.localStorage.setItem('org.doubango.identity.realm', data.relam);

    window.localStorage.setItem('org.doubango.expert.disable_video', 'false');
    window.localStorage.setItem('org.doubango.expert.websocket_server_url', "wss://onlinevoipcalls.com:8089/ws");
    window.localStorage.setItem('org.doubango.expert.sip_outboundproxy_url', "");
    window.localStorage.setItem('org.doubango.expert.disable_early_ims', 'false');
    window.localStorage.setItem('org.doubango.expert.video_size', "{ minWidth: 640, minHeight:480, maxWidth: 640, maxHeight:480 }");
    window.localStorage.setItem('org.doubango.expert.enable_media_caching', 'false');
    window.localStorage.setItem('org.doubango.expert.ice_servers', "");
    window.localStorage.setItem('org.doubango.expert.disable_callbtn_options', 'false');
    window.localStorage.setItem('org.doubango.expert.bandwidth', "{ audio:64, video:512 }");
    window.localStorage.setItem('org.doubango.expert.enable_rtcweb_breaker', 'false');
    window.localStorage.setItem('org.doubango.expert.disable_debug', 'false');
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
    window.open(url, '_blank', 'PopUp' + randomnumber + ',scrollbars=1,menubar=0,resizable=1,width = ' + w + ', height = ' + h + ', top = ' + top + ', left = ' + left);
  }


  showdial(){
    this.showdialbox = (this.showdialbox == true ? false : true);

  }

  dialnumber(key){
    debugger
    var n = $('#txtPhoneNumber').val();
    var x = n+""+key;
    $('#txtPhoneNumber').val(x);
    console.log(key);
  }

  
  dialcallNumber(){
 
  var datastring = {
    extension : "2014",
    phone_no : $('#txtPhoneNumber').val()
  }
  debugger
  this.authService.dialcallNumber(datastring)
  .subscribe(data => {
    console.log(data);
    if(data.status_code == 201){

    debugger
     
      // this.toastr.success(data.status_message, '');
      // this.router.navigateByUrl('/user-list');
    }else{
      
    }
  })  
  // this.router.navigateByUrl('/admin');
}

getcontact​(agentid){
  this.authService.getcontact​(agentid)
  .subscribe(data=> {
    console.log(data);
      this.contact_list = data;
    
    debugger
  })  
}

}
