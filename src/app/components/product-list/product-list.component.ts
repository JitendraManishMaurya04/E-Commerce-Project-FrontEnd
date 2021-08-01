import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] | any;
  currentCategoryId: number | any;
  searchMode : Boolean | any;
  
  constructor(private productListService : ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
    this.listProducts();
    });
  }

  listProducts(){

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    console.log('Search Bar Keyword -> ' + this.searchMode );

    if(this.searchMode){
      this.hanldeSearchProducts();
    }
    else{
      this.handleListProducts();
    }
    
  }

 //Handling Products List By Search by Name:
  hanldeSearchProducts() {
    const theKeyword: string | any = this.route.snapshot.paramMap.get('keyword');
    console.log('Search Bar Keyword Value -> ' + theKeyword );

    this.productListService.saerchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

//Handling Products List By Category ID:
  handleListProducts(){

    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    console.log('hasCategoryId -> ' + hasCategoryId );

    if(hasCategoryId){
      //Get the "id" param String and convert to number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.has('id');
      console.log('Insiade IF Check - currentCategoryId -> ' + this.currentCategoryId );
    }
    else{
      //Set default category id to "1" if not available
      this.currentCategoryId = 1;
      console.log('Insiade ELSE Check - currentCategoryId -> ' + this.currentCategoryId );
    }

    //Get the Product List for the given Category ID
    this.productListService.getProductList(this.currentCategoryId).subscribe(
      data => {
        console.log('Product List For Category-ID->' + this.currentCategoryId + ' = '  + JSON.stringify(data));
        this.products = data;
      }
    );
  }

}
