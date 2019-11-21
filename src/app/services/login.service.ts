import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authToken: any;
  user: any;

  constructor(private http:HttpClient) { }

  url = 'http://localhost:3000';

  authenticateUser(user){
    return this.http.post(`${this.url}/users/authenticate`, user);
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
}
