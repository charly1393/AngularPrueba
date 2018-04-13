import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '@firebase/util';

@Injectable()
export class HttpServicesService {

  constructor(
    public http: HttpClient
  ) {  }

  configUrl = '192.168.0.1';

  getProduct() {
    if(true){

    }
    return this.http.get('http://192.168.1.65:8084/product/new?name=aswerd&category=regdf&location=qwe&price=2');
  }

  postPrueba(){
  
  }

}
