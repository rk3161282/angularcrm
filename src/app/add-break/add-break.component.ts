import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../user';
import { AuthService } from  '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-break',
  templateUrl: './add-break.component.html',
  styleUrls: ['./add-break.component.css']
})
export class AddBreakComponent implements OnInit {

 authForm: FormGroup;
  // productForm: FormGroup;
  isSubmitted  =  false;

  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }


  ngOnInit(): void {
    var data = JSON.parse(sessionStorage.getItem('ACC_DATA'));
   
    this.authForm  =  this.formBuilder.group({
      role: [''],
      time: ['',  Validators.required],
      break: ['', Validators.required],
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
     role: "2",
     break: this.authForm.value.break ,
     time: this.authForm.value.time
  }
  this.authService.createBreak(datastring)
  .subscribe(data => {
    console.log(data);
    if(data.status_code == 201){
      var insertId = data.result.insertId;
      
 
      this.toastr.success(data.status_message, '');
      this.router.navigateByUrl('/break-type');
    }else{
      this.toastr.error(data.status_message, '');
      this.router.navigateByUrl('/add-break-type');
    }
  })  
  // this.router.navigateByUrl('/admin');
}







}
