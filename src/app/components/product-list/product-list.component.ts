import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: any;
  searchKey: any = "";

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
   this.route.paramMap.subscribe(() => {
      if (this.route.snapshot.paramMap.has('keyword')) {   
        this.getProductsBySearch();
      } else {
        this.listProducts();
      }
    });
  }

  getProductsBySearch(): void {
      if (this.route.snapshot.paramMap.has('keyword')) {
        this.searchKey = this.route.snapshot.paramMap.get('keyword')
      }
      this.productService.getProductsBySearch(this.searchKey).subscribe(data=>{this.products = data});
   }
  
  listProducts(): void {
    if (this.route.snapshot.paramMap.has('id')) {
        this.currentCategoryId = this.route.snapshot.paramMap.get('id');
      }

      if (this.currentCategoryId == undefined) {
            this.productService.getProductsList().subscribe(
              data => {this.products = data}, error => console.log(error)
            );
    } else {
        this.productService.getProductsByCategory(this.currentCategoryId).subscribe(
          data => {this.products = data}
        );
    }
  }

}
