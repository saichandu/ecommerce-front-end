import { Injectable } from '@angular/core';
import { CartItem } from "../common/cart-item";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  session: Storage = sessionStorage;
  
  totalCartItems: CartItem[] = [];
  totalCartValue: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  
  constructor() {
    let data = this.session.getItem('totalcartitems');
    if (data != null) {
      this.totalCartItems = JSON.parse(data);
      this.compute();
    }
  }
  
  addToCart(currentlyAdded : CartItem) {
    
      let existingItem: boolean = false;

      if (this.totalCartItems.length > 0) {
         for (let cartItem of this.totalCartItems) {
             if (currentlyAdded.id === cartItem.id) {
                cartItem.numberOfUnits++;
                existingItem = true;
                break;
             }
         }
      }
    
      if (!existingItem) {
         if (currentlyAdded.numberOfUnits === 0) {
           currentlyAdded.numberOfUnits++;
         }
         this.totalCartItems.push(currentlyAdded);
      }
    
      this.compute();
  }
  
  removeFromCart(currentlyRemoved : CartItem) {
    
      currentlyRemoved.numberOfUnits--;
    
      const index =  this.totalCartItems.findIndex(temp => temp.id == currentlyRemoved.id);
      
      if (currentlyRemoved.numberOfUnits === 0) {
        this.totalCartItems.splice(index, 1);
      }
    
      this.compute();
  }
  
  compute(): void {
      let totalPrice : number = 0;
      let totalItems : number = 0;
    
      for (let cartItem of this.totalCartItems){
        totalPrice = totalPrice + cartItem.unitPrice * cartItem.numberOfUnits;
        totalItems = totalItems + cartItem.numberOfUnits;
      }
    
      this.totalCartValue.next(totalPrice);
      this.totalQuantity.next(totalItems);
    
      this.session.setItem('totalcartitems', JSON.stringify(this.totalCartItems));
  }
}
