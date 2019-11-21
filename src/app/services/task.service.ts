import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient ) { }

  url = 'http://localhost:3000';

  getTasks(){
    return this.http.get(`${this.url}/tasks`);
  }

  getTaskByID(id){
    return this.http.get(`${this.url}/tasks/${id}`);
  }

  postTask(title){
    const task = {
      title: title
    };
    return this.http.post(`${this.url}/tasks`, task);
  }

  patchTask(id, title, isDone){
    const task = {
      title: title,
      isDone: isDone
    };
    return this.http.patch(`${this.url}/tasks/${id}`, task);
  }

  deleteTask(id){
    return this.http.delete(`${this.url}/tasks/${id}`);
  }
}
