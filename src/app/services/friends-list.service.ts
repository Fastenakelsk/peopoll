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
    return this.http.post(`${this.url}/requests/`, request);
  }

  getReceivedRequests(username){
    return this.http.get(`${this.url}/requests/received/${username}`);
  }  
  
  getSentRequests(username){
    return this.http.get(`${this.url}/requests/sent/${username}`);
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
    return this.http.get(`${this.url}/friends/allFriendships/${username}`);
  }
}
