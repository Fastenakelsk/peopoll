import { Component, OnInit } from '@angular/core';
import { FriendsListService } from '../../services/friends-list.service';
import { Router } from '@angular/router';

import { User } from 'src/app/models/User';
import { Request } from 'src/app/models/Request';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  username: String;
  user: User;
  receivedRequests: Request[];
  sentRequests: Request[];
  friends: String[];
  onRequestRegister:any={};
  receivedRequestRegister:any={};
  sentRequestRegister:any={};
  friendsRegister:any={};
  request: Request;
  allowRequest: Boolean;

  constructor(private friendslistService: FriendsListService, private router: Router) {
    this.friendslistService.getRequests.subscribe(res => {
      if(res == true){
        this.getRequests();
      }
    })
   }

  ngOnInit() {
    this.allowRequest = true;

    this.getRequests();
  }

  getRequests(){
    this.friendslistService.getReceivedRequests(JSON.parse(localStorage.getItem('user')).username).subscribe(receivedRequests =>{
      this.receivedRequestRegister = receivedRequests;
      if(this.receivedRequestRegister[0] == undefined){
        this.receivedRequests = undefined;
      }else{
        this.receivedRequests = this.receivedRequestRegister;
      }
      console.log(this.receivedRequests);
    });

    this.friendslistService.getSentRequests(JSON.parse(localStorage.getItem('user')).username).subscribe(sentRequests => {
      this.sentRequestRegister = sentRequests;
      if(this.sentRequestRegister[0] == undefined){
        this.sentRequests = undefined;
      }else{
        this.sentRequests = this.sentRequestRegister;
      }
      console.log(this.sentRequests);
    });

    this.friendslistService.getFriendsByUsername(JSON.parse(localStorage.getItem('user')).username).subscribe(friends => {
      this.friendsRegister = friends;
      if(this.friendsRegister[0] == undefined){
        this.friends = undefined;
      }else{
        this.friends = this.friendsRegister;
      }
      console.log(this.friends);
    });
  }

  onRequest(){
    this.friendslistService.getUserByUsername(this.username).subscribe(user => {
      this.onRequestRegister = user;
      if(this.onRequestRegister != undefined){
        this.request = {
          sender: JSON.parse(localStorage.getItem('user')).username,
          receiver: this.onRequestRegister.username
        }
        if(this.sentRequests == undefined && this.friends == undefined){
          if(this.request.sender != this.request.receiver){
            this.friendslistService.sendFriendRequest(this.request).subscribe(res => {
              this.friendslistService.getRequests.next(res ? true : false);
            });
          }else{
            console.log("Can't request to be your own friend");
          }
        }else{
          
          this.checkForExistingFriendship();
          this.checkForExistingRequest();

          if(!this.allowRequest){
            console.log('Request already exists or Friendship already exists');
          }else{
            if(this.request.sender != this.request.receiver){
              console.log('Request sent');
              this.friendslistService.sendFriendRequest(this.request).subscribe(res => {
                this.friendslistService.getRequests.next(res ? true : false);
              });
            }else{
              console.log("Can't request to be your own friend");
            }
          }
        }
      }else{
        console.log("Receiver doesn't exist");
      }
    });
  }

  checkForExistingFriendship(){
    if(this.friends != undefined){
      for(let item in this.friends){
        if(this.request.sender == JSON.parse(localStorage.getItem('user')).username && this.request.receiver == this.friends[item] || this.request.receiver == JSON.parse(localStorage.getItem('user')).username && this.request.sender == this.friends[item]){
          this.allowRequest = false;
          console.log('Friendship already exists');
        }
      }
    }
  }

  checkForExistingRequest(){
    if(this.sentRequests != undefined){
      for(let item in this.sentRequests){
        if(this.sentRequests[item].sender == this.request.sender && this.sentRequests[item].receiver == this.request.receiver){
          this.allowRequest = false;
          console.log('Request already exists');
        }
      }
    }
  }

  onAccept(request){
    this.friendslistService.deleteFriendRequest(request).subscribe(res => {
      console.log(res);
    });
    this.friendslistService.makeFriend(request).subscribe(res => {
      this.friendslistService.getRequests.next(res ? true : false);
    });
  }

  onDecline(request){
    this.friendslistService.deleteFriendRequest(request).subscribe(res => {
      this.friendslistService.getRequests.next(res ? true : false);
    });
  }
}
