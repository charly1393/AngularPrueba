import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from '../models/product'

@Injectable()
export class ProductService {

  //La lista de productos
  productList: AngularFireList<any>;
  //Un producto seleccionado
  selectedProduct: Product = new Product();

  constructor(private firebase: AngularFireDatabase) { }

  getProducts(){
    return this.productList = this.firebase.list('products');
  }

  insertProducts(product: Product){
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price 
    })
  }

  updateProduct(product: Product){
    this.productList.update(product.$key,{ //Con esto busca el producto por la clave
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price 
    });
  }

  deleteProduct($key: string){
    this.productList.remove($key);
  }
}
