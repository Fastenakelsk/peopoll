import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  dataRegister: any={};

  constructor(private http:HttpClient) { }

  url = 'http://localhost:3000';

  makePoll(poll){
    return this.http.post(`${this.url}/polls/`, poll).subscribe(res => {
      this.dataRegister = res;
      console.log(poll);
      console.log(this.dataRegister);
      if(this.dataRegister.success){
        console.log('Poll added');
      }else{
        console.log('Poll not added');
      }
    });
  }

  getAllRelatedPolls(username){
    return this.http.get(`${this.url}/polls/byUsername/${username}`);
  }

  getPollByID(pollID){
    return this.http.get(`${this.url}/polls/byID/${pollID}`);
  }
}