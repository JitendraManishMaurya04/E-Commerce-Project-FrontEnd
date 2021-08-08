import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private HttpClient : HttpClient) { }


  getProduct(productId: number): Observable<Product>{
    //Fetching the product based on ID for Master-Detail view
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.HttpClient.get<Product>(productUrl);
  }

  getProductList(theCategoryId : number): Observable<Product[]>{

    //Building a URL based on categoryId
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductcategories() : Observable<ProductCategory[]>{

    return this.HttpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  saerchProducts(theKeyword: any) : Observable<Product[]>{
    
    //Building a URL based on Search By Product Name or keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.HttpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }


}




interface GetResponseProduct{
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}