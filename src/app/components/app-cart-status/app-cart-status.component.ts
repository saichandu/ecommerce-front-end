import { CartService } from "../../services/cart-service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-status',
  templateUrl: './app-cart-status.component.html',
  styleUrls: ['./app-cart-status.component.css']
})
export class AppCartStatusComponent implements OnInit {

   totalCartValue: number;
   totalQuantity : number;
  
  constructor(private cartService : CartService) { 
    this.totalCartValue = 0.00;
    this.totalQuantity = 0;
  }

  ngOnInit(): void {
    this.refreshCart();
  }
  
   refreshCart(): void {
     this.cartService.totalCartValue.subscribe(data => {this.totalCartValue = data});
     this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
     
     this.cartService.compute();
  }

}
