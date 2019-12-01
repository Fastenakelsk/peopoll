import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authToken: any;
  user: any;
  isLoggedIn = new BehaviorSubject(false);

  constructor(private http:HttpClient) { }

  url = 'http://localhost:3000';

  authenticateUser(user){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post(`${this.url}/users/authenticate`, user, {headers: headers});
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    if (localStorage.id_token == undefined ){
      return false;
    }else{
      const helper = new JwtHelperService();
      //console.log(helper.isTokenExpired(localStorage.id_token));  
      return !helper.isTokenExpired(localStorage.id_token);
    }
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  
}
