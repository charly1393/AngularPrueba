import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
//import { Observable } from '@firebase/util';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly ROOT_URL = 'http://';
  posts:Observable<any>;

  constructor(private http: HttpClient, private toastr: ToastrService){}

  getPosts(){
    this.posts = this.http.get('http://192.168.1.65:8084/product/new?name=aswerd&category=regdf&location=qwe&price=2');
    this.toastr.success('Successfull Operation', 'Successfull Operation');
  }

  title = 'app';
}
