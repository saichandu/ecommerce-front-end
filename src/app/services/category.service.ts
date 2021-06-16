import { Injectable } from '@angular/core';
import { Category } from "../common/category";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  categories: Category[] = [];

  private url2 = "http://localhost:9090/api/product-category";
  
  currentCategoryId : any;
  
  constructor(private httpClient: HttpClient) { }
  
  ngOnInit(): void {
    this.getCategoriesList().subscribe(data => {this.categories = data});
    
  };
  
   getCategoriesList() : Observable<Category[]> {
      let data = this.httpClient.get<Category[]>(this.url2);
      return data;
  }
}
