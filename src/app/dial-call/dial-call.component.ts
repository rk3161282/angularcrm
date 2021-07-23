import { Component, OnInit } from '@angular/core';

declare function sipRegister() : any ;

@Component({
  selector: 'app-dial-call',
  templateUrl: './dial-call.component.html',
  styleUrls: ['./dial-call.component.css']
})
export class DialCallComponent implements OnInit {

  showPortal = true;

  constructor() { }

  ngOnInit(): void {
    sipRegister();
    var data = JSON.parse(sessionStorage.getItem('ACC_DATA'));

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
    const w = screen.width * 0.35;
    const h = screen.height * 0.35;
    // const left = (screen.width / 2) - (w / 2);
    // const top = (screen.height / 2) - (h / 2);
    const left = 10;
    const top = 10;
    const randomnumber = Math.floor((Math.random() * 100) + 1);
    // tslint:disable-next-line:max-line-length
    window.open(url, '_blank', 'PopUp' + randomnumber + ',scrollbars=1,menubar=0,resizable=1,width = ' + w + ', height = ' + h + ', top = ' + top + ', left = ' + left);
  }

}
