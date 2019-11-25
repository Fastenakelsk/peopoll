import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Poll } from 'src/app/models/Poll';
import { PollService } from 'src/app/services/poll.service';

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
  chosenAnswer: String;

  constructor(private loginService: LoginService, private pollService: PollService, private router: Router) { }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('user')).username;

    this.pollService.getAllRelatedPolls(this.username).subscribe(res => {
      console.log(res);
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

  onVote(pollId){
    console.log(this.chosenAnswer);
    console.log(pollId);
    //Add 1 vote to the voteon on pollitem
    //move user from invitedusers to votedusers in database
    //reload page
  }

}
