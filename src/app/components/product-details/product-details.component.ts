import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId : number | any;
  
  //Create a temporary product before the value is assigned from service call to avoid RACE-Condition
  product: Product = new Product();

  constructor(private productService : ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductdetails();
    })
  }

  handleProductdetails() {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(this.productId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

}
