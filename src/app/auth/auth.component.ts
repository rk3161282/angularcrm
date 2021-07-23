import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../user';
import { AuthService } from  '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  isSubmitted  =  false;

  constructor(private SpinnerService: NgxSpinnerService, private toastr: ToastrService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    var data = JSON.parse(sessionStorage.getItem('ACC_DATA'));
    if(data){
      this.router.navigateByUrl('/dashboard');
    }else{
      this.router.navigateByUrl('/');
    }
    this.authForm  =  this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
}

get formControls() { return this.authForm.controls; }

showSuccess(message, title){
  this.toastr.success(message, title)
}

showError(message, title){
  this.toastr.error(message, title)
}

showInfo(message, title){
  this.toastr.info(message, title)
}

showWarning(message, title){
  this.toastr.warning(message, title)
}

forgotpassword(){
  this.router.navigate(['/forgot-password']);
}

signIn(){
  this.SpinnerService.show();
  debugger
  this.isSubmitted = true;
  if(this.authForm.invalid){
    this.SpinnerService.hide();  
    return;

  }
  this.authService.signIn(this.authForm.value)
  .subscribe(data => {
    console.log(data)
    if(data.status_code == 200){
      this.SpinnerService.hide();  
      console.log(data);
      var resultdata = data.result;
      sessionStorage.setItem('ACCESS_TOKEN', resultdata.access_token);
      sessionStorage.setItem('ACC_DATA', JSON.stringify(resultdata));
      this.toastr.success('Login Successfully', 'Login');
      this.router.navigateByUrl('/dashboard');
    }else{
      this.toastr.error(data.status_message, '');
      this.SpinnerService.hide();  
      this.router.navigateByUrl('/');
    }
    
  })  
  // this.router.navigateByUrl('/admin');
}


}
