import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '@firebase/util';
import { ToastrService } from 'ngx-toastr';
import { HttpListComponent } from '../components/http-list/http-list.component';

@Injectable()
export class HttpServicesService {

  public posts: Post[];

  constructor(
    public http: HttpClient, private toastr: ToastrService
  ) { }

  configUrl = '192.168.0.1';

  public getPosts() {
    //let headers = new HttpParams().set('Authorization','auth-token');
    //this.posts = this.http.get('http://192.168.1.65:8084/product/new?name=aswerd&category=regdf&location=qwe&price=2');
    this.http.get<Post[]>
      ('https://jsonplaceholder.typicode.com/posts').subscribe(x => {
        this.posts = x;
        console.log('Number of posts: ' + this.posts.length);

        var i = 1;

        for (let index = 0; index < this.posts.length; index++) {
          console.log('Id: ' + this.posts[index].id);
          console.log('Title: ' + this.posts[index].title);
          console.log('Body: ' + this.posts[index].body);

          var table: HTMLTableElement = <HTMLTableElement>document.getElementById("tablecontent");

          
          if (table.rows.length <= i) {

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

}

interface Post {
  userId: number,
  id: number,
  title: string,
  body: string,
}
