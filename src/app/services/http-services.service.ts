import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '@firebase/util';
import { ToastrService } from 'ngx-toastr';
import { HttpListComponent } from '../components/http-list/http-list.component';
import { Product } from '../models/product'

@Injectable()
export class HttpServicesService {

  public posts: Post[];
  public products: Product[];
  public peticion: Peticion[];

  constructor(
    public http: HttpClient, private toastr: ToastrService
  ) { }

  configUrl = '192.168.0.1';

  public getPosts() {
    console.log(this.http.get('http://192.168.1.65:8084/product/new?name=nombre&category=book&location=esp&price=20'));

    this.http.get<Post[]>
      ('https://jsonplaceholder.typicode.com/posts').subscribe(x => {
        this.posts = x;
        //console.log('Number of posts: ' + this.posts.length);

        var i = 1;

        for (let index = 0; index < this.posts.length; index++) {

          var table: HTMLTableElement = <HTMLTableElement>document.getElementById("tablecontent");

          
          if (true/*table.rows.length <= i*/) {

            var row = table.insertRow(table.rows.length);

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            cell1.innerHTML = "" + this.posts[index].id;
            cell2.innerHTML = this.posts[index].title;
            cell3.innerHTML = this.posts[index].body;
            i++;
          }

          //console.log(table.innerHTML);
        }

        if (this.posts != null) {
          this.toastr.success('Successfull Operation', 'Successfull Operation');
        } else if(table.rows.length>100) {
          this.toastr.error('Failed Operation', 'Failed Operation');
        }

      }

      );

  }

  httpPostExample() {

    this.http.post("http://192.168.1.65:8084/product",
        {
            "name": "prueba",
            "category": "prueba2",
            "location": "prueba3",
            "price": 23
        })
        .subscribe(
            (val) => {
                console.log("POST call successful value returned in body", 
                            val);
            },
            response => {
                console.log("POST call in error", response);
            },
            () => {
                console.log("The POST observable is now completed.");
            });
    }

}



interface Post {
  userId: number,
  id: number,
  title: string,
  body: string,
}

interface Peticion {
  content: string
}
