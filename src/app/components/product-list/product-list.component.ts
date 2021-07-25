import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] | any;
  
  constructor(private productListService : ProductService ) { }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(){
    this.productListService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
