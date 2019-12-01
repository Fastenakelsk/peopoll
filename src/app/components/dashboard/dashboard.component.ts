import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Poll } from 'src/app/models/Poll';
import { PollService } from 'src/app/services/poll.service';
import { PollItem } from 'src/app/models/PollItem';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: String;
  creatorPollArray: Array<Poll> = [];
  votedPollArray: Array<Poll> = [];
  invitedPollArray: Array<Poll> = [];
  dataRegister:any={}
  votedPoll: Poll;
  chosenAnswer: PollItem;

  constructor(private loginService: LoginService, private pollService: PollService, private router: Router) {
    this.pollService.getNewPolls.subscribe(res => {
      if(res == true){
        this.getPolls();
      }   
    });
   }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('user')).username;

    this.getPolls();

  }

  onClickRadio(poll){
    console.log(poll)
    this.pollService.getPollByID(poll._id).subscribe(res => {
      this.dataRegister = res;
      this.votedPoll = this.dataRegister;
    });
  }

  getPolls(){
    this.creatorPollArray = [];
    this.votedPollArray = [];
    this.invitedPollArray = [];
    this.dataRegister = undefined;
    this.votedPoll = undefined;
    this.chosenAnswer = undefined;
    
    this.pollService.getAllRelatedPolls(this.username).subscribe(res => {
      for(let poll in res){
        if(res[poll].creator == this.username){
          this.creatorPollArray.push(res[poll]);
        }else{
          if(res[poll].invitedUsers.includes(this.username)){
            this.invitedPollArray.push(res[poll]);
          }else{
            if(res[poll].votedUsers.includes(this.username)){
              this.votedPollArray.push(res[poll]);
            }else{
              console.log("???");
            }
          }
        }
      }
     console.log(this.creatorPollArray);
     console.log(this.invitedPollArray);
     console.log(this.votedPollArray);
    });
  }

  onVote(){
    for(let item in this.votedPoll.pollItems){
      console.log(this.votedPoll.pollItems[item]._id);
      if(this.votedPoll.pollItems[item]._id == this.chosenAnswer._id){
        this.votedPoll.pollItems[item].votes++;
        this.votedPoll.invitedUsers.splice(this.votedPoll.invitedUsers.indexOf(this.username));
        this.votedPoll.votedUsers.push(this.username);
      }
    }
    console.log(this.votedPoll);
    this.pollService.patchPoll(this.votedPoll).subscribe(() => {
      this.ngOnInit();
    });
    
  }

}
