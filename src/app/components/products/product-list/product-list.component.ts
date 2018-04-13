import { Component, OnInit } from '@angular/core';

//service
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { ToastrService } from 'ngx-toastr';
import { HttpServicesService } from '../../../services/http-services.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[];
  public httpService: HttpServicesService;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
  ) {   }


  ngOnInit() {
    this.productService.getProducts()
      .snapshotChanges()
      .subscribe(item => {
        this.productList = [];
        item.forEach(element =>{
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.productList.push(x as Product);
        })
      });

      //this.httpService.getProduct();
  }

  onEdit(product: Product){
    this.productService.selectedProduct = Object.assign({},product);
  }

  onDelete($key: string){
    if(confirm('Are you sure you want to delete it?')){
      this.productService.deleteProduct($key);
     this.toastr.success('Successfull Operation', 'Product Deleted');
    }
  }

}
