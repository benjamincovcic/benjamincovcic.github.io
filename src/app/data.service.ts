import { Injectable } from '@angular/core';
import { RequestService, HttpRequestType } from './request.service';
import { Http } from '@angular/http';

@Injectable()
export class DataService {

  private readonly url: string = 'http://zoeyport.dev.crossvallia.ba';
  private readonly loginHeaders: Headers = new Headers({ 'Content-Type': 'application/json' });
  data:any;
  constructor(private requestService: RequestService, private http: Http) {
    
    }
  
    onInit(){
      
    }

  public getAllData(callback){
    console.log("tusam");
    this.requestService.createRequest(HttpRequestType.Get, this.url+"/?all=true", null,null, (data: any) => {
      this.data = data;
     
      callback(null);
  },(err)=>{
      callback(err);
  });
  
  }
  public getPaginationData(callback, n){
    this.requestService.createRequest(HttpRequestType.Get, this.url+"/?page="+ n.toString(), null,null, (data: any) => {
      this.data = data;
     
      callback(null);
  },(err)=>{
      callback(err);
  });
  }


}
