import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class CompaniesService {
  data = new Array();
  isLoading = false;

  constructor(private http: HttpClient) {
    this.getAllCompanies();
  }

  setData(data:any){
    this.data = data;
   }

  getData(){
    return this.data;
  }


  async getAllCompanies(){
    this.isLoading = true;
    // alert('Loading...');
    this.http.get(environment.apiUrl+'/companies/')
      .subscribe(response => {
        if (response['status'] == 200 && response) {
          this.setData(response['data']);
        }
      })
  }

  createCompany(data){
    this.http.post(environment.apiUrl+'/companies/createCompany', {company: data})
      .subscribe(response => {
          if (response['status'] == 200 && response) {
            this.setData([...this.getData(), data]);
          }
        })
  }

  updateCompany(data){
    this.http.post(environment.apiUrl+'/companies/updateCompany', {company: data})
      .subscribe(response => {
        if (response['status'] == 200 && response) {
          this.setData(this.getData().map(item => {
            if (item._id == data._id){
              item = {...data};
            }
          }));
        }
      });
  }

}