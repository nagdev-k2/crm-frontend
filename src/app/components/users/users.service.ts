import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  data = new Array();
  constructor(private http: HttpClient) {
    this.getAllUsers();
  }
  
  setData(data:any){
    this.data = data;
   }

  getData(){
    return this.data;
  }

  getAllUsers(){
  this.http.get(environment.apiUrl+'/users/')
  .subscribe(response => {
    if (response['status'] == 200 && response) {
      this.setData(response['data']);
    }
  })
  }

  createUser(data){
  this.http.post(environment.apiUrl+'/users/createUser', {user: data})
  .subscribe(response => {
    if (response['status'] == 200 && response) {
      this.setData([...this.getData(), data]);
    }
  })
  }

  updateUser(data){
    this.http.post(environment.apiUrl+'/users/updateUser', {user: data})
      .subscribe(response => {
        if (response['status'] == 200 && response) {
          this.setData(this.getData().map(item => {
            if (item._id == data._id){
              item = {...data};
            }
          }));
        }
      })
  }

}
