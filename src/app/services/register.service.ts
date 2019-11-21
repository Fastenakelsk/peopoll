import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  validateRegister(user){
    if(user == undefined || user.username == "" || user.email == "" || user.password == "" || user.username == undefined || user.email == undefined || user.password == undefined){
      return false;
    }else{
      return true;
    }
  }

  url = 'http://localhost:3000';

  getUsers(){
    return this.http.get(`${this.url}/users`);
  }

  getUserByUsername(username){
    return this.http.get(`${this.url}/users/${username}`);
  }
  
  registerUser(user){
    console.log(user);
    return this.http.post(`${this.url}/users/`, user);
  }

  /*getTaskByID(id){
    return this.http.get(`${this.url}/tasks/${id}`);
  }



  patchTask(id, title, isDone){
    const task = {
      title: title,
      isDone: isDone
    };
    return this.http.patch(`${this.url}/tasks/${id}`, task);
  }

  deleteTask(id){
    return this.http.delete(`${this.url}/tasks/${id}`);
  }*/
}
