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
  requests: Request[];
  onRequestRegister:any={};
  onInitRegister:any={};
  request: Request;

  constructor(private friendslistService: FriendsListService, private router: Router) { }

  ngOnInit() {
    /*this.registerService.getUsers().subscribe(users => {
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
    });*/
    this.friendslistService.getFriendRequests(JSON.parse(localStorage.getItem('user')).username).subscribe(requests =>{
      this.onInitRegister = requests;
      if(this.onInitRegister[0] == undefined){
        this.requests = undefined;
      }else{
        this.requests = this.onInitRegister;
      }
      console.log(this.requests);
    });
  }

  onRequest(){
    this.friendslistService.getUserByUsername(this.username).subscribe(user => {
      this.onRequestRegister = user;
      if(this.onRequestRegister != null){
        this.request = {
          sender: JSON.parse(localStorage.getItem('user')).username,
          receiver: this.onRequestRegister.username
        }
        if(this.request.sender != this.request.receiver){
          this.friendslistService.sendFriendRequest(this.request);
        }else{
          console.log("Can't request to be your own friend");
        }
      }else{
        console.log("User doesn't exist");
      }
    });
  }

  onAccept(request){
    this.friendslistService.makeFriend(request);
    this.ngOnInit();
    this.ngOnInit();
  }

  onDecline(request){
    this.friendslistService.deleteFriendRequest(request);
    this.ngOnInit();
    this.ngOnInit();
  }
}
