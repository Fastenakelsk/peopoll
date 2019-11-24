import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendsListService {
  dataRegister:any={};


  constructor(private http:HttpClient) { }

  url = 'http://localhost:3000';

  getUserByUsername(username){
    return this.http.get(`${this.url}/users/${username}`);
  }

  sendFriendRequest(request){
    /*if(!this.doesRequestAlreadyExist(request)){
      console.log('Request already exists');
      return false;
    }else{
      if(!this.doesFriendshipAlreadyExist(request)){
        console.log('Friendship already exists');
        return false;
      }else{*/
        return this.http.post(`${this.url}/requests/`, request).subscribe(res =>{
          this.dataRegister = res;
          if(this.dataRegister.success){
            console.log('Request sent');
          }else{
            console.log('Request not sent');
          }
        });
      //}
    //}
  }

  getFriendRequests(username){
    return this.http.get(`${this.url}/requests/${username}`);
  }

  deleteFriendRequest(request){
    return this.http.delete(`${this.url}/requests/${request._id}`).subscribe(res =>{
      this.dataRegister = res;
      if(this.dataRegister.success){
        console.log('Request deleted');
      }else{
        console.log('Request not deleted');
      }
    })
  }

  makeFriend(request){
    return this.http.post(`${this.url}/friends/`, request).subscribe(res => {
      this.dataRegister = res;
      if(this.dataRegister.success){
        console.log('Friend added');
        this.deleteFriendRequest(request);
      }else{
        console.log('Friend not added');
      }
    });
  }

  getFriendsByUsername(username){
    return this.http.get(`${this.url}/friends/${username}`);
  }

  /*doesRequestAlreadyExist(request){
    this.http.get(`${this.url}/requests/${request.sender}/${request.receiver}`).subscribe(res => {
      this.dataRegister = res;
    });
    console.log(this.dataRegister.success);
    if(this.dataRegister.success){
      console.log('Request doesn\'t exist');
      return true;
    }else{
      console.log('Request exists');
      return false;
    }
  }

  doesFriendshipAlreadyExist(request){
    this.http.get(`${this.url}/friends/${request.sender}/${request.receiver}`).subscribe(res => {
      this.dataRegister = res;
    });
    console.log(this.dataRegister.success);
    if(this.dataRegister.success){
      console.log('Friendship doesn\'t exist');
      return true;
    }else{
      console.log('Friendship exists');
      return false;
    }
  }*/
}
