import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '@firebase/util';
import { ToastrService } from 'ngx-toastr';
import { HttpListComponent } from '../components/http-list/http-list.component';
import { Product } from '../models/product'

@Injectable()
export class HttpServicesService {

  //Variables
  public products: Product[];
  product: Product;

  /**
   * Constructor del servicio
   * 
   * @param http recibe http como parametro tipo de objeto HttpClient 
   * @param toastr recibe toastr como parametro tipo de objeto ToastrService
   */
  constructor(
    public http: HttpClient, private toastr: ToastrService
  ) { }


  /**
   * Metodo httpGetProducts() te devuelve todos los productos en la base de datos mediante una peticion
   * GET y los añade en la tabla
   */
  httpGetProducts() {

    try {
      this.http.get<Product[]>
        ('http://192.168.1.68:8087/product/getall').subscribe(x => {

          this.products = x;
          console.log("Products length: " + this.products.length);

          for (let index = 0; index < this.products.length; index++) {

            var table: HTMLTableElement = <HTMLTableElement>document.getElementById("tablecontent");

            var row = table.insertRow(table.rows.length);

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            cell1.innerHTML = this.products[index].name;
            cell2.innerHTML = this.products[index].category;
            cell3.innerHTML = "" + this.products[index].id;

          }

        });

      this.toastr.success('Successfull Operation', 'Successfull Operation');

    } catch (e) {
      console.log(e);
      this.toastr.error('Failure Operation', 'Failure Operation');
    }

  }

  /**
   * Metodo httpPostExample() inserta en la bbdd un objeto Product mediante una peticion
   * POSt, pasando sus atributos como parametros
   */
  httpPostExample() {

    this.product = new Product();
    this.product.name = 'Carlos3';
    this.product.category = 'prueba';
    this.product.location = 'dialogo';
    this.product.price = 13;

    this.http.post("http://192.168.1.68:8087/product/new",
      {
        name: this.product.name,
        category: this.product.category,
        location: this.product.location,
        price: this.product.price
      })
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
          this.httpGetProducts();
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        }
      );

      

  }

  httpPutExample() {

    this.http.put("http://192.168.1.68:8087/product/new",
      {
        name: 'prueba',
        category: 'prueba2',
        location: 'prueba3',
        price: 23
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

  httpDeleteExample() {
    /* this.http.delete("",{
      name: 'prueba',
      category: 'prueba2',
      location: 'prueba3',
      price: 23
    }); */
  }

}



