import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  currentCategoryId: number | any;
  previousCategoryId: number | any;
  searchMode : Boolean = false;
  previousKeyword : any = null;

  //properties for Pagination Support
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  
  constructor(private productListService : ProductService,
              private cartService : CartService,
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

    //If we have different search Keywords than previous then Reset the thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }
    
    this.previousKeyword = theKeyword;
    console.log(`currentKeyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);
    
    //Get the Product List for the given searched Keyword
    this.productListService.searchProductPaginate(this.thePageNumber - 1, 
                                                  this.thePageSize, 
                                                  theKeyword)
                                                  .subscribe(
                                                    data  => {
                                                    this.products = data._embedded.products;
                                                    this.thePageNumber = data.page.number + 1;
                                                    this.thePageSize = data.page.size;
                                                    this.theTotalElements = data.page.totalElements;
                                                  });

    // this.productListService.searchProducts(theKeyword).subscribe(
    //   data => {
    //     this.products = data;
    //   }
    // );
  }

//Handling Products List By Category ID:
  handleListProducts(){

    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    console.log('hasCategoryId -> ' + hasCategoryId );

    if(hasCategoryId){
      //Get the "id" param String and convert to number using the "+" symbol
      this.currentCategoryId = this.route.snapshot.paramMap.get('id');
      console.log('Insiade IF Check - currentCategoryId -> ' + this.currentCategoryId );
    }
    else{
      //Set default category id to "1" if not available
      this.currentCategoryId = 1;
      console.log('Insiade ELSE Check - currentCategoryId -> ' + this.currentCategoryId );
    }

    //If we have different categoryId than previous then Reset the thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);


    //Get the Product List for the given Category ID
    this.productListService.getProductListPaginate(this.thePageNumber - 1, 
                                           this.thePageSize, 
                                           this.currentCategoryId)
                                           .subscribe(
                                             data  => {
                                              this.products = data._embedded.products;
                                              this.thePageNumber = data.page.number + 1;
                                              this.thePageSize = data.page.size;
                                              this.theTotalElements = data.page.totalElements;
                                          });

    // this.productListService.getProductList(this.currentCategoryId).subscribe(
    //   data => {
    //     console.log('Product List For Category-ID->' + this.currentCategoryId + ' = '  + JSON.stringify(data));
    //     this.products = data;
    //   }
    // );
  }

  // processResult(){
  //   return data  => {
  //     this.products = data._embedded.product;
  //     this.thePageNumber = data.page.number + 1;
  //     this.thePageSize = data.page.size;
  //     this.theTotalElements = data.page.totalElements;
  //   };
  // }

  //Takes pageSize user-input from UI
  updatePageSize(event : Event | any){
    this.thePageSize = event.target.value;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct : Product){
    console.log(`Adding to Cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

}
