import { Product } from "../../common/product";
import { CartItem } from "../../common/cart-item";
import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart-service";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  product: Product = new Product();
  productId: any = 0;

  constructor(private productService: ProductService,
              private cartService : CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      if (this.route.snapshot.paramMap.has('id')) {   
        this.getProductDetails();
      }
    });
  }
  
  getProductDetails(): void {
    if (this.route.snapshot.paramMap.has('id')) {
        this.productId = this.route.snapshot.paramMap.get('id');
      }
      
      this.productService.getProductDetails(this.productId).subscribe(
          data => {this.product = data}
        );
  }

  addToCart(product: Product) {
    let cartItem: CartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }
}
