import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  message=new Object;
  constructor() { }
  setMessage(data:any){
   this.message = data;
  }
  getMessage(){
    return this.message;
  }
}
