import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authToken: any;
  user: any;

  constructor(private http:HttpClient) { }

  url = 'http://localhost:3000';

  authenticateUser(user){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post(`${this.url}/users/authenticate`, user, {headers: headers});
  }

  getProfile(){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    console.log(this.http.get(`${this.url}/users/profile`, {headers: headers}));
    return this.http.get(`${this.url}/users/profile`, {headers: headers});
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
      //console.log('Hello');
      return false;
    }else{
      //console.log('Goodbye');
      const helper = new JwtHelperService();
      //console.log(helper.isTokenExpired(localStorage.id_token));  
      return !helper.isTokenExpired(localStorage.id_token); // other people are putting 'id_token'' here but it didn't work for me so i just put the localStorage item
    }
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  
}
