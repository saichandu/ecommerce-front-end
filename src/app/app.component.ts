import {ProductService} from "./services/product.service";
import {Component} from '@angular/core';
import {Category} from "./common/category";
import { CategoryService } from "./services/category.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce-front-end';
  
  categories: Category[] = [];
  
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategoriesList().subscribe(data=> {this.categories = data});
  }
}
