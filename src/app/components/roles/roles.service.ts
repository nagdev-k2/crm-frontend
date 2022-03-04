import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  data = new Array();

  constructor(private http: HttpClient) {
    this.getAllRoles();
  }

  setData(data:any){
    this.data = data;
   }
   getData(){
     return this.data;
   }

   getAllRoles() {
    this.http.get(environment.apiUrl+'/roles/')
    .subscribe(response => {
      if (response['status'] == 200 && response) {
          this.setData(response['data']);
      }
    })
   }
}
