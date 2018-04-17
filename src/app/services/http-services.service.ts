import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '@firebase/util';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpServicesService {

  posts: Post[];

  constructor(
    public http: HttpClient, private toastr: ToastrService
  ) {  }

  configUrl = '192.168.0.1';

  public getPosts(){
    //let headers = new HttpParams().set('Authorization','auth-token');
    //this.posts = this.http.get('http://192.168.1.65:8084/product/new?name=aswerd&category=regdf&location=qwe&price=2');
    this.http.get<Post[]>
    ('https://jsonplaceholder.typicode.com/posts').subscribe(x =>{
      this.posts = x;
      console.log('Number of posts: '+ this.posts.length);
      
      for (let index = 0; index < this.posts.length; index++) {
        console.log('Id: '+ this.posts[index].id);
        console.log('Title: '+ this.posts[index].title);
        console.log('Body: '+ this.posts[index].body);
      }

      if(this.posts != null){
        this.toastr.success('Successfull Operation', 'Successfull Operation');
      }else{
        this.toastr.error('Failed Operation', 'Failed Operation');
      }
      
    }

    );
    
  }

  postPrueba(){
  
  }

}

interface Post{
  userId: number,
  id: number,
  title: string,
  body: string,
}
