import { Product } from "../common/product";
import { Category } from "../common/category";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  categories: Category[] = [];
  
  private url1 = "http://localhost:9090/api/products";
  private url2 = "http://localhost:9090/api/product-category/";
  private url3 = "http://localhost:9090/api/search/";
  
  constructor(private httpClient: HttpClient) { }
  
  getProductsList() : Observable<Product[]> {
      let data = this.httpClient.get<Product[]>(this.url1);
      return data;
  }
  
  getProductsByCategory(currentCategoryId : number) : Observable<Product[]> {
      let data = this.httpClient.get<Product[]>(this.url2 + currentCategoryId + "/products");
      return data;
  }
  
   getProductsBySearch(searchKey : number) : Observable<Product[]> {
      let data = this.httpClient.get<Product[]>(this.url3 + searchKey);
      return data;
  }
  
  getProductDetails(productId : number) : Observable<Product> {
      let data = this.httpClient.get<Product>(this.url1 + "/" + productId);
      return data;
  }
}
