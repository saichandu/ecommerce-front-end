import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products: Product[] = [];
  
  constructor(private route: ActivatedRoute, private productService : ProductService, private router: Router) { }

  doSearch(searchInput: string) {
    this.router.navigateByUrl(`/search/${searchInput}`);
  }
  
  ngOnInit(): void {
  }
  
   
}
