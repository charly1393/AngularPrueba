import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { HttpServicesService } from '../app/services/http-services.service';

@Component({
  selector: 'app-inicial',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  httpServices: HttpServicesService;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getPosts() {
      this.httpServices = new HttpServicesService(this.http, this.toastr);
      this.httpServices.httpPostExample();
      this.httpServices.httpGetProducts();
  }

  title = 'app';
}
