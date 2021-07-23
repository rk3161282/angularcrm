import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../../user';
import { AuthService } from  '../../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  authForm: FormGroup;
  // productForm: FormGroup;
  isSubmitted  =  false;
  user_id : string;
  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }


  ngOnInit(): void {
    var data = JSON.parse(sessionStorage.getItem('ACC_DATA'));
    this.user_id = data.users_id;
    this.authForm  =  this.formBuilder.group({
      name: ['',  Validators.required],
      contact: ['', Validators.required],
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


createContact(){
  debugger
  this.isSubmitted = true;
  if(this.authForm.invalid){
    return;
  }
  
  var datastring = {
     name: this.authForm.value.name,
     contact: this.authForm.value.contact ,
     agent_id: this.user_id.toString()
  }
  this.authService.createContact(datastring)
  .subscribe(data => {
    console.log(data);
    if(data.status_code == 201){
 
      this.toastr.success(data.status_message, '');
      this.router.navigateByUrl('/contact-list');
    }else{
      this.toastr.error(data.status_message, '');
      this.router.navigateByUrl('/add-contact');
    }
  })  
  // this.router.navigateByUrl('/admin');
}






}
