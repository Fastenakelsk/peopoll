import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from '../../services/register.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users: User[];
  newUser: User;
  email: String;
  username: String;
  password: String;
  dataRegister:any={}

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private registerService:RegisterService,
    private router:Router
    ) {}

  ngOnInit() {

    this.registerService.getUsers().subscribe(users => {
      let userObject;
      let usersArray = [];
      for(let user in users){
          userObject = [
          {
            username: users[user].username,
            password: users[user].password,
            email: users[user].email
          }
        ]
        usersArray.push(userObject);
      }
      this.users = usersArray;
      console.log(this.users);
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });

  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  getEmailErrorMessage() {
    return this.emailFormControl.hasError('required') ? 'You must enter a value' :
      this.emailFormControl.hasError('email') ? 'Not a valid email' :
            '';
  }
  
  getUsernameErrorMessage() {
    return this.usernameFormControl.hasError('required') ? 'You must enter a value' :
            '';
  }

  getPasswordErrorMessage() {
    return this.passwordFormControl.hasError('required') ? 'You must enter a value' :
      /*this.passwordFormControl.hasError('minlength') ? 'Password must be at least 5 characters' :*/
            '';
  }

  register(){
    this.newUser = {
      username: this.usernameFormControl.value,
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value
    }

    console.log(this.registerService.validateRegister(this.newUser));
    this.registerService.registerUser(this.newUser).subscribe(data => {
      this.dataRegister = data;
      if(this.dataRegister.success){
        console.log(this.dataRegister);
        this.router.navigate(['/login']);
      }else{
        console.log(this.dataRegister);
      }
    });
  }

}
