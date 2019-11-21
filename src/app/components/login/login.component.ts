import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  existingUser: User;
  dataRegister:any={}

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private loginService:LoginService,
    private router:Router
  ) { }


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  passwordFormControl = new FormControl('', [Validators.required]);
  usernameFormControl = new FormControl('', [Validators.required]);

  getUsernameErrorMessage() {
    return this.usernameFormControl.hasError('required') ? 'You must enter a value' :
            '';
  }

  getPasswordErrorMessage() {
    return this.passwordFormControl.hasError('required') ? 'You must enter a value' :
      /*this.passwordFormControl.hasError('minlength') ? 'Password must be at least 5 characters' :*/
            '';
  }
  
  login(){
    this.existingUser = {
      username: this.usernameFormControl.value,
      email: '',
      password: this.passwordFormControl.value
    }
    console.log(this.existingUser);

    this.loginService.authenticateUser(this.existingUser).subscribe(data => {
      this.dataRegister = data;
      if(this.dataRegister.success){
        console.log(this.dataRegister);
        this.loginService.storeUserData(this.dataRegister.token, this.dataRegister.user);
        this.router.navigate(['/dashboard']);
      }else{
        console.log(this.dataRegister.message);
      }
    })
  }

}
