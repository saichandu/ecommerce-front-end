import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Purchase } from "../common/purchase";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  purchaseUrl = "http://localhost:9090/checkout/purchase";
  
  constructor(private httpClient : HttpClient) { }
  
  purchase(purchase: Purchase):Observable<any> {
    return this.httpClient.post<String>(this.purchaseUrl, purchase);
  }
}
