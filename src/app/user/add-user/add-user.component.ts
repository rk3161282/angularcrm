import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../../user';
import { AuthService } from  '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner"; 
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  authForm: FormGroup;
  // productForm: FormGroup;
  isSubmitted  =  false;
  contact_list: any = [];

  constructor(private SpinnerService: NgxSpinnerService,private toastr: ToastrService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }


  ngOnInit(): void {
    var data = JSON.parse(sessionStorage.getItem('ACC_DATA'));
    this.getproject​();
    this.authForm  =  this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: [''],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      caller_id: ['', Validators.required],
      incoming_call_no : ['', Validators.required],
      recording : ['',Validators.required],
      address1: ['address1'],
      address2: ['address2'],
      city: ['city'],
      state: ['state'],
      project_id : ['',Validators.required],
      role : ['', Validators.required],
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


createUser(){
  debugger
  this.isSubmitted = true;
  if(this.authForm.invalid){
    return;
  }
  this.SpinnerService.show();
  var datastring = {
     hospital_id: this.authForm.value.assign_clinic,
     name: this.authForm.value.first_name + " "+ this.authForm.value.last_name,
     email: this.authForm.value.email,
     phone: this.authForm.value.phone,
     gender: this.authForm.value.gender,
     address1: this.authForm.value.address1,
     address2: this.authForm.value.address2,
     city: this.authForm.value.city,
     state: this.authForm.value.state,
     user_type_id : this.authForm.value.role,
     project : this.authForm.value.project_id,
    //  incoming_call_no : this.authForm.value.incoming_call_no,
    project_id : this.authForm.value.project_id,
  }
  this.authService.usersignup(datastring)
  .subscribe(data => {
    console.log(data);
    if(data.status_code == 201){
      var insertId = data.result.insertId;
      var extension = data.result.extension;
debugger
      this.SpinnerService.hide();
      this.addAsteriskExtension(insertId,extension);
      // this.toastr.success(data.status_message, '');
      // this.router.navigateByUrl('/user-list');
    }else{
      this.SpinnerService.hide();
      this.toastr.error(data.status_message, '');
      this.router.navigateByUrl('/user-add');
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
    incoming_call_no : this.authForm.value.incoming_call_no,
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
      this.SpinnerService.hide();
      this.toastr.success(data.status_message, '');
      this.router.navigateByUrl('/user-list');
    }else{
      this.toastr.error(data.status_message, '');
      this.SpinnerService.hide();
      this.router.navigateByUrl('/user-add');
    }
  })  
}

getproject​(){
  this.SpinnerService.show();
  this.authService.getproject​()
  .subscribe(data=> {
    console.log(data);
      this.contact_list = data;
      debugger
      this.SpinnerService.hide();
    // this.hospital_list = data.result;

    debugger
  })  
}


exportToExcel() {
  const ws: xlsx.WorkSheet =   
  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, 'user.xlsx');
 }







}
