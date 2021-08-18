import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  //Subject is a Sub-Class of Observable to publish events
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){

    //Check if the Item is already present in the Cart
    let alreadyExistsInCart: boolean = false;

    if(this.cartItems.length > 0){
      //Find the Item in the Cart based on Item-ID
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id === theCartItem.id){
          alreadyExistsInCart = true;
          tempCartItem.quantity++;
          break;
        }
      }

    }

    if(alreadyExistsInCart === false){
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();
  }

  //Removing Items from Cart Logic
  removeFromCart(theCartItem: CartItem){
    theCartItem.quantity--;

    if(theCartItem.quantity === 0){
      //Finding Item Index
      const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id );

      //Removing Item if Index is found and greater than -1
      if(itemIndex > -1){
        this.cartItems.splice(itemIndex, 1);
      }
    }
    else{
      this.computeCartTotals();
    }
  }


  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //Publish the new values ... All Subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    console.log(`TOTAL CART VALUE: ${totalPriceValue}, ${totalQuantityValue}`);
    
  }
}
