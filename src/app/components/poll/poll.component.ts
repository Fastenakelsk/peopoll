import { Component, OnInit } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { FriendsListService } from '../../services/friends-list.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Poll } from 'src/app/models/Poll';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  dataRegister: any={};
  poll: Poll;
  pollItemName: String;
  pollItem: any={text: String, votes: Number};
  pollItemsArray: Array<{text: String, votes: Number}> = [];
  invitedUsersArray: [];
  pollName: String;
  title: String;
  username:String;
  FriendsList: Array<String> = [];
  friendsFormControl = new FormControl();


  constructor(private router: Router, private pollService: PollService, private friendsListService: FriendsListService) { }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('user')).username;

    this.friendsListService.getFriendsByUsername(this.username).subscribe(usernames => {
      for(let username in usernames){
        this.FriendsList.push(usernames[username]);
      }
    });
  }

  onNewPoll(){
    this.addInvitedUsers();
    this.poll = {
      title: this.pollName,
      pollItems: this.pollItemsArray,
      creator: this.username,
      invitedUsers: this.invitedUsersArray,
      votedUsers: []
    }
    this.pollService.makePoll(this.poll);
    this.router.navigate(["/dashboard"]);
  }

  onAddPollItem(){
    this.pollItem = {
      text: this.pollItemName,
      votes: 0
    }
    console.log(this.pollItem.text);
    if(this.pollItem.text != null && this.pollItem.text != undefined && this.pollItem.text != ""){
      this.pollItemsArray.push(this.pollItem);
    }
    console.log(this.pollItemsArray);
    this.pollItemName = "";
    }

  addInvitedUsers(){
    this.invitedUsersArray = this.friendsFormControl.value;
    console.log(this.invitedUsersArray);
  }
}
