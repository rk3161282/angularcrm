import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../../user';
import { AuthService } from  '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner"; 
@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css']
})
export class ContactlistComponent implements OnInit {

  authForm: FormGroup;
  // productForm: FormGroup;
  isSubmitted  =  false;
  currentPage : number;
  itemsPerPage : number;
  hospital_id : string;
  contact_list : any = [];
  startcount = 1;
  endcount = 0;
  config: any;
  data = {
  status_code : ""
  }
  user_id : string;

  constructor(private SpinnerService: NgxSpinnerService,private toastr: ToastrService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }


  ngOnInit(): void {
    var data = JSON.parse(sessionStorage.getItem('ACC_DATA'));
    this.user_id = data.users_id;
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.contact_list.length
    };
    this.startcount = 1;
    this.endcount = this.config.currentPage * this.config.itemsPerPage;
    console.log(this.config);
    this.getcontact​(this.user_id);

    this.authForm  =  this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: [''],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      extension: ['', Validators.required],
      address1: ['address1'],
      address2: ['address2'],
      city: ['city'],
      state: ['state'],
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
  
  var datastring = {
     hospital_id: this.authForm.value.assign_clinic,
     name: this.authForm.value.first_name + " "+ this.authForm.value.last_name,
     email: this.authForm.value.email,
     phone: this.authForm.value.phone,
     gender: this.authForm.value.extension,
     address1: this.authForm.value.address1,
     address2: this.authForm.value.address2,
     city: this.authForm.value.city,
     state: this.authForm.value.state,
     user_type_id : this.authForm.value.role,
     project : "project"
  }
  this.authService.usersignup(datastring)
  .subscribe(data => {
    console.log(data);
    if(data.status_code == 201){
      this.toastr.success(data.status_message, '');
      this.router.navigateByUrl('/dashboard');
    }else{
      this.toastr.error(data.status_message, '');
      this.router.navigateByUrl('/user-list');
    }
  })  
  // this.router.navigateByUrl('/admin');
}

pageChanged(event){
  this.config.currentPage = event;
  console.log(this.config);
  this.startcount = this.config.currentPage * this.config.itemsPerPage;
  this.endcount = this.config.currentPage * this.config.itemsPerPage;
}


getcontact​(agentid){
  this.SpinnerService.show();
  this.authService.getcontact​(agentid)
  .subscribe(data=> {
    console.log(data);
      this.contact_list = data;
      debugger
      this.SpinnerService.hide();
    // this.hospital_list = data.result;

    debugger
  })  
}





}
