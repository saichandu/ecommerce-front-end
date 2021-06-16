import { CartItem } from "../../common/cart-item";
import { CartService } from "../../services/cart-service";
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  totalCartValue: number;
  totalQuantity: number;

  datasource : MatTableDataSource<CartItem> = new MatTableDataSource<CartItem>();
  
  cartItemsList: CartItem[] = [];

  constructor(private cartService: CartService) { 
    this.totalCartValue = 0.00;
    this.totalQuantity = 0;
  }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails(): void {
     this.cartItemsList = this.cartService.totalCartItems;
    
    if (this.cartItemsList == undefined) {
      this.cartItemsList = [];
    }
    
     this.cartService.totalCartValue.subscribe(data => this.totalCartValue = data);
     this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
    
     this.cartService.compute();
    
     this.datasource.data = this.cartItemsList;
  }
  
  incrementQuantity(element: CartItem) {
    this.cartService.addToCart(element);
  }
  
  decrementQuantity(element: CartItem) {
    this.cartService.removeFromCart(element);
    this.datasource.data = this.cartItemsList;
  }
}
