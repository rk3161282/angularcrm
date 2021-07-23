import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../../user';
import { AuthService } from  '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner"; 
import * as OT from '@opentok/client';
import { AgoraClient, ClientEvent, NgxAgoraService, Stream, StreamEvent } from 'ngx-agora';
// import { OpentokService } from '../../../app/services/opentok.service';

@Component({
  selector: 'app-callinput',
  templateUrl: './callinput.component.html',
  styleUrls: ['./callinput.component.css']
  // providers: [ OpentokService ]
})
export class CallinputComponent implements OnInit {

  localCallId = 'agora_local';
  remoteCalls: string[] = [];
  audioimage = false;
  videoimage = false;
  authForm: FormGroup;

  	/**
   * Whether the local client has tuned in to the Agora meeting room
   */
	connected = false;
	private client: AgoraClient;
	private localStream: Stream;
	private uid: number;
	channelName:string = "Vivektest";
  accessToken : string;
  main_stream: any;

  // productForm: FormGroup;
  showvideoscreen = false;
  isSubmitted  =  false;
  // apiKey : string = "46479372";
  // sessionId : string = "1_MX40NjQ3OTM3Mn5-MTYyNzAxNDgyNDMxMn5WeFlUUmZsV2Z6anBQUnJMU3lmempuanp-fg";
  // token : string = "T1==cGFydG5lcl9pZD00NjQ3OTM3MiZzaWc9MWE1NWQ0OTQ5M2VmZDFlODMxZDFmYWUwZGE4MjY1MzQzZDhkYjQ1MzpzZXNzaW9uX2lkPTFfTVg0ME5qUTNPVE0zTW41LU1UWXlOekF4TkRneU5ETXhNbjVXZUZsVVVtWnNWMlo2YW5CUVVuSk1VM2xtZW1wdWFucC1mZyZjcmVhdGVfdGltZT0xNjI3MDE0ODU1Jm5vbmNlPTAuNDQwODA1MzI4OTQ3OTY3NjUmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTYyOTYwNjg1MiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";
  showModal: boolean;
  showModal1: boolean;
  persondata: any[];
  
  
  constructor(private ngxAgoraService: NgxAgoraService,private SpinnerService: NgxSpinnerService,private toastr: ToastrService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { 
    this.uid = Math.floor(Math.random() * 1000000);
  }

  ngOnInit(): void {
    // replace these values with those generated in your TokBox Account

    debugger
    this.authForm  =  this.formBuilder.group({
      mobilenumber: ['', Validators.required]
    });

    // (optional) add server code here
    // this.initializeSession();


    var datastring = {
      channelName : this.channelName,
      uid : this.uid
    }
    this.authService.getRtcAccessToken(datastring).subscribe((data:any) => {
      this.persondata = Array.from(Object.keys(data), k=>data[k]);
      console.log(this.persondata[2]);
      debugger
      this.accessToken = "0065c9eb982e9c744e883fadb81cf318c48IABt8+8N9/UCdHViK4dwH61NipjNMhSIdv/F8+oKKWcXaXYLvegAAAAAEAD7XOPUzrH7YAEAAQDMsftg";

    })

  this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
  this.assignClientHandlers();

  this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
  // this.localStream.setVideoProfile('720p_3');
  this.localStream.setVideoEncoderConfiguration({
    // The video resolution.
    resolution: {
      width: 640,
      height: 480
    },
    // The video frame rate (fps). We recommend setting it as 15. Do not set it to a value greater than 30.
    frameRate: {
      min: 15,
      max: 30
    },
    // The video bitrate (Kbps). Refer to the video profile table below to set this parameter.
    bitrate: {
      min: 400,
      max: 2000
    }
  });
  this.assignLocalStreamHandlers();
  
  // Join and publish methods added in this step
  this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
  }
  get formControls() { return this.authForm.controls; }
// Handling all of our errors here by alerting them
  // handleError(error) {
  //   if (error) {
  //     alert(error.message);
  //   }
  // }

  //  initializeSession() {
  //   var session = OT.initSession(this.apiKey, this.sessionId);
  
  //   // Subscribe to a newly created stream
  //   session.on('streamCreated', function(event) {
  //     debugger
  //     session.subscribe(event.stream, 'subscriber', {
  //       insertMode: 'append',
  //       width: '100%',
  //       height: '100%'
  //     }, this.handleError);
  //   });
  
  //   // Create a publisher
  //   var publisher = OT.initPublisher('publisher', {
  //     insertMode: 'append',
  //     width: '100%',
  //     height: '100%'
  //   }, this.handleError);
  
  //   // Connect to the session
  //   var _this = this;
  //   session.connect(this.token, function(error) {
  //     // If the connection is successful, initialize a publisher and publish to the session
  //     if (error) {
  //       this.handleError(error);
  //     } else {
  //       session.publish(publisher, _this.handleError);
  //     }
  //   });
  // }




    
  addvideocall(){
    this.isSubmitted = true;
    if(this.authForm.invalid){
      return;
    }
    var datastring = {
      phone: this.authForm.value.mobilenumber,
      project: 'project',
   }
   this.authService.addvideocall(datastring)
   .subscribe(data => {
     console.log(data);
     debugger
     if(data.status_code == 200){
        // this.sessionId = data.result.session;
        // console.log(this.sessionId);
        // this.token = data.result.token;
        // console.log(this.token);
        // this.initializeSession();
        this.showvideoscreen = true;
       this.SpinnerService.hide();
       // this.toastr.success(data.status_message, '');
       // this.router.navigateByUrl('/user-list');
     }else{
       this.SpinnerService.hide();
       this.toastr.error(data.status_message, '');
      //  this.router.navigateByUrl('/user-add');
     }
   })  
  }


  showpopup(){
    this.showModal = true;
  }

  hide()
  {
    this.showModal = false;
    this.showModal1 = false;
  }

  /**
   * Attempts to connect to an online chat room where users can host and receive A/V streams.
   */
  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    console.log(this.channelName);
    console.log(this.accessToken);
      this.client.join(this.accessToken,this.channelName, this.uid, onSuccess, onFailure);
    }
    
    /**
     * Attempts to upload the created local A/V stream to a joined chat room.
     */
    publish(): void {
      this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
    }
    
    private assignClientHandlers(): void {
      debugger
      this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully'+evt);
      });
    
      this.client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
        '',
        () => console.log('Renewed the channel key successfully.'),
        renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
      });
    
      this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
      });
    
      this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      debugger
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        console.log(this.remoteCalls);
        
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
      });
    
      this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
      });
    
      this.client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
      });
    
    
    }
    
    private assignLocalStreamHandlers(): void {
      
      this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('accessAllowed');
      });
    
      // The user has denied access to the camera and mic.
      this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('accessDenied');
      });
    }
    
    private initLocalStream(onSuccess?: () => any): void {
      
      this.localStream.init(
      () => {
        // The user has granted access to the camera and mic.
        this.localStream.play(this.localCallId);
        if (onSuccess) {
        this.connected = true;
        onSuccess();
        }
      },
      err => console.error('getUserMedia failed', err)
      );
    }
    
    private getRemoteId(stream: Stream): string {
      return `agora_remote-${stream.getId()}`;
    }


	muteAudio(){
		this.localStream.muteAudio();
		this.audioimage = true;
	  }
	
	unmuteAudio(){
		this.localStream.unmuteAudio();
		this.audioimage = false;
	}

	muteVideo(){
		this.localStream.muteVideo();
		this.videoimage = true;
	}

	unmuteVideo(){
		this.localStream.unmuteVideo();
		this.videoimage = false;
	}

	endCall(){
    this.showModal = true;
   
  
	
  }

  endcallyes(){
    var call_id = JSON.parse(sessionStorage.getItem('callpatientdata')).call_id
    var channel_name = JSON.parse(sessionStorage.getItem('callpatientdata')).channel_name
    var datastring1 = {
      uid: this.uid.toString(),
      chanelName: channel_name,
      resourceid : sessionStorage.getItem('resourceId'),
      sid : sessionStorage.getItem('sid')
    }
    // this.restApi.stopCallRecording(datastring1).subscribe((data:any) => {
    //   if(data.status_code != 200){
    //     // this.showToast('danger','Online Doctor',data.status_message);
    //   }else{
    //     // debugger
    //     this.restApi.updateRecordingname({callId:call_id,name:data.result.serverResponse.fileList}).subscribe((data:any) => {
    //       // debugger
    //       if(data.status_code != 200){
    //         // this.showToast('danger','Online Doctor',data.status_message);
    //       }else{
            
    //         // this.showToast('success','Online Doctor',data.status_message);
           
    //       }
    //     })
    //     // this.showToast('success','Online Doctor',data.status_message);
       
    //   }
    // })

    //updateCallStatus
    var datastring = {
      status: 'completed',
      callId: call_id

    }
    // this.restApi.updateCallStatus(datastring).subscribe((data:any) => {
    //   if(data.status_code != 200){
       
    //   }else{
    //     this.socketService.callDisConnectByVet({call_id:call_id});
    //     this.localStream.close();
    //     // this.showModal = true;
    //     sessionStorage.setItem('callend','true');
    //     this._router.navigate(['/dashboard']);
    //   }
    // })
  }

}
