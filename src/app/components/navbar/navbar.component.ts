import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username:String;

  constructor(   
    private _formBuilder: FormBuilder,
    private loginService:LoginService,
    private router:Router
    ) { }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('user')).username;
  }

  onLogoutClick(){
    this.loginService.logout();
    console.log("Logged Out");
    this.router.navigate(['/login']);
    return false;
  }

}
