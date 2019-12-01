import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsListService {
  dataRegister:any={};
  getRequests = new BehaviorSubject(false);


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
    return this.http.delete(`${this.url}/requests/${request._id}`);
  }

  makeFriend(request){
    return this.http.post(`${this.url}/friends/`, request);
  }

  getFriendsByUsername(username){
    return this.http.get(`${this.url}/friends/allFriendships/${username}`);
  }
}
