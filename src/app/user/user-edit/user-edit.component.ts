import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../../user';
import { AuthService } from  '../../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  authForm: FormGroup;
  // productForm: FormGroup;
  isSubmitted  =  false;

  individualuserlist:any;

  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }


  ngOnInit(): void {
    var data = JSON.parse(sessionStorage.getItem('ACC_DATA'));
    this.individualuserlist = JSON.parse(localStorage.getItem('individualuserlist'));
    this.authForm  =  this.formBuilder.group({
      first_name: [this.individualuserlist.name, Validators.required],
      last_name: [''],
      phone: [this.individualuserlist.phone, Validators.required],
      email: [this.individualuserlist.email, Validators.required],
      gender: [this.individualuserlist.gender, Validators.required],
      incoming_call_no: [this.individualuserlist.incoming_call_nodid,Validators.required],
      caller_id: [this.individualuserlist.extension_no, Validators.required],
      address1: [this.individualuserlist.address1],
      address2: [this.individualuserlist.address2],
      city: [this.individualuserlist.city],
      state: [this.individualuserlist.state],
      recording : [(this.individualuserlist.recording?this.individualuserlist.recording:'Yes')],
      role : [this.individualuserlist.user_type_id, Validators.required],
    });
  }

  get formControls() { return this.authForm.controls; }

addeducationDetails(): void {
  (this.authForm.get('phones') as FormArray).push(
    this.formBuilder.control(null)
  );
}

removeeducationDetails(index) {
  (this.authForm.get('phones') as FormArray).removeAt(index);
}

geteducationDetailsFormControls(): AbstractControl[] {
  return (<FormArray> this.authForm.get('phones')).controls
}


editUser(){
  debugger
  this.isSubmitted = true;
  if(this.authForm.invalid){
    return;
  }
  this.individualuserlist = JSON.parse(localStorage.getItem('individualuserlist'));
  var datastring = {
     name: this.authForm.value.first_name + " "+ this.authForm.value.last_name,
     gender: this.authForm.value.gender,
     address1: this.authForm.value.address1,
     address2: this.authForm.value.address2,
     city: this.authForm.value.city,
     state: this.authForm.value.state,
     incoming_call_no : this.authForm.value.incoming_call_no,
     uuid : this.individualuserlist.uuid,
     project : "project"
  }
  this.authService.editUser(datastring)
  .subscribe(data => {
    console.log(data);
    if(data.status_code == 200){
      var insertId = data.result.insertId;
      var extension = data.result.extension;
debugger
      // this.addAsteriskExtension(insertId,extension);
      this.toastr.success(data.status_message, '');
      this.router.navigateByUrl('/user-list');
    }else{
      this.toastr.error(data.status_message, '');
      this.router.navigateByUrl('/user-edit');
    }
  })  
  // this.router.navigateByUrl('/admin');
}


addAsteriskExtension(user_id,extension){
  var datastring = {
    user_id : user_id,
    extension : extension,
    password : "",
    name : this.authForm.value.first_name + " "+ this.authForm.value.last_name,
    voicemail : "novm",
    ringtimer : 0,
    noanswer : "",
    recording : "",
    outboundcid : "",
    sipname : "",
    noanswer_cid : "",
    busy_cid : "",
    chanunavail_cid : "",
    noanswer_dest : "",
    busy_dest : "",
    chanunavail_dest : "",
    mohclass : "default",
    tech : "pjsip",
    id : extension,
    dial : "PJSIP/"+extension,
    devicetype : "fixed",
    user : extension,
    description : extension,
    emergency_cid : "",
    hint_override : "",
    cwtone : "disabled",
    recording_in_external : "dontcare",
    recording_out_external : "dontcare",
    recording_in_internal : "dontcare",
    recording_out_internal : "dontcare",
    recording_ondemand : "disabled",
    recording_priority : 10,
    answermode : "disabled",
    intercom : "enabled",
    cid_masquerade : extension,
    concurrency_limit : 3,
    devicedata : extension,
    accountcode : "",
    allow : "",
    avpf : "yes",
    callerid : extension +" <"+extension+">",
    canreinvite : "",
    context : "from-internal",
    defaultuser : "",
    deny : "",
    disallow : "",
    dtmfmode : "rfc4733",
    encryption : "",
    force_avp : "",
    host : "",
    icesupport : "yes",
    mailbox : "",
    namedcallgroup : "",
    namedpickupgroup : "",
    nat : "",
    permit : "",
    port : "",
    qualify : "",
    qualifyfreq : 60,
    rtcp_mux : "yes",
    secret : "b3283eda60c019fd111ac7d970f5a36c",
    sendrpid : "pai",
    sessiontimers : "",
    sipdriver : "chan_pjsip",
    transport : "",
    trustrpid : "yes",
    type : "",
    user_eq_phone : "yes",
    videosupport : "",
    aggregate_mwi : "yes",
    device_state_busy_at : 0,
    direct_media : "yes",
    force_rport : "yes",
    match : "",
    max_contacts : 1,
    maximum_expiration : 7200,
    media_encryption : "dtls",
    media_encryption_optimistic : "yes",
    media_use_received_transport : "no",
    message_context : "",
    minimum_expiration : 60,
    mwi_subscription : "auto",
    outbound_proxy : "",
    refer_blind_progress : "yes",
    rewrite_contact : "yes",
    rtp_symmetric : "yes",
    rtp_timeout : 0,
    rtp_timeout_hold : 0,
    send_connected_line : "yes",
    timers : "yes",
    timers_min_se : 90,
    callwaiting_enable : "ENABLED",
    findmefollow_strategy : "ringallv2-prim",
    findmefollow_grptime : 20,
    findmefollow_grppre : "",
    findmefollow_grplist : extension,
    findmefollow_annmsg_id : "",
    findmefollow_postdest : "ext-local,"+extension+",dest",
    findmefollow_dring : "",
    findmefollow_needsconf : "",
    findmefollow_remotealert_id : "",
    findmefollow_toolate_id : "",
    findmefollow_ringing : "Ring",
    findmefollow_pre_ring : 7,
    findmefollow_voicemail : "novm",
    findmefollow_calendar_id : "",
    findmefollow_calendar_match : "yes",
    findmefollow_changecid : "default",
    findmefollow_fixedcid : "",
    findmefollow_enabled : "",
    languages_language : ""

  }

  this.authService.addUserOnAsterisk(datastring)
  .subscribe(data => {
    console.log(data);
    if(data.status_code == 200){
      debugger
      this.toastr.success(data.status_message, '');
      this.router.navigateByUrl('/user-list');
    }else{
      this.toastr.error(data.status_message, '');
      this.router.navigateByUrl('/user-add');
    }
  })  
}


}
