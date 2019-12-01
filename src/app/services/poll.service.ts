import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  dataRegister: any={};
  getNewPolls = new BehaviorSubject(false);

  constructor(private http:HttpClient) { }

  url = 'http://localhost:3000';

  makePoll(poll){
    return this.http.post(`${this.url}/polls/`, poll);
  }

  getAllRelatedPolls(username){
    return this.http.get(`${this.url}/polls/byUsername/${username}`);
  }

  getPollByID(pollID){
    return this.http.get(`${this.url}/polls/byID/${pollID}`);
  }

  patchPoll(poll){
      return this.http.patch(`${this.url}/polls/${poll._id}`, poll);
  }
}