import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../../user';
import { AuthService } from  '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";  
import * as xlsx from 'xlsx';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  data = [];
  dtOptions: any = {};
  authForm: FormGroup;
  // productForm: FormGroup;
  isSubmitted  =  false;
  currentPage : number;
  itemsPerPage : number;
  hospital_id : string;
  patient_list : any = [];
  startcount = 1;
  endcount = 0;
  config: any;
  

  // dtOptions: DataTables.Settings = {};

  constructor(private SpinnerService: NgxSpinnerService,private toastr: ToastrService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }


  ngOnInit(): void {
    localStorage.removeItem('individualuserlist');
    var data = JSON.parse(sessionStorage.getItem('ACC_DATA'));
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true
    // };
    
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.patient_list.length
    };
    this.startcount = 1;
    this.endcount = this.config.currentPage * this.config.itemsPerPage;
    console.log(this.config);
    this.getuser(1,10000000000);

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
  this.SpinnerService.show();
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
    this.SpinnerService.hide();
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


getuser(page,limit){

  // this.dtOptions = {
  //   pagingType: 'full_numbers',
  //   pageLength: 5,
  //   processing: true
  // };

  this.SpinnerService.show();
  this.authService.getUser(page,limit)
  .subscribe((data: any[])=> {
    console.log(data);
      this.patient_list = data;
      this.data = data;
      setTimeout(()=>{                          
        $('#datatableexample').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          lengthMenu : [10, 25, 50, 100],
          order:[[1,"desc"]],
          dom: 'Blfrtip',
          buttons: [ 'excel' ]
      } );
      }, 1);
      debugger
      this.SpinnerService.hide();
    // this.hospital_list = data.result;

    debugger
  })  
}

//userView
userView(data){
  console.log(data);
  localStorage.setItem('individualuserlist',JSON.stringify(data));
  this.router.navigateByUrl('/user-view');
}

exportToExcel() {
  const ws: xlsx.WorkSheet =   
  xlsx.utils.table_to_sheet(this.epltable.nativeElement);
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(wb, 'userlist.xlsx');
 }




}
