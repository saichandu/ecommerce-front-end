import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { Country } from '../common/country';
import { Order } from "../common/order";
import { State } from '../common/state';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private httpClient : HttpClient) { }
  
  url: string = "http://localhost:9090/cc/countries/";
  url2: string = "http://localhost:9090/api/orders/";
  
  getCCMonths(startMonth : number) : Observable<number[]> {
    let months : number[] = [];
    
    for (let i=startMonth;i<13;i++) {
      months.push(i);
    }
    return of(months);
  }

   getCCYears() : Observable<number[]> {
    let years : number[] = [];
    
    for (let i=0;i<10;i++) {
      years.push(new Date().getFullYear() + i);
    }
    return of(years);
  }
  
  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.url);
  }
  
  getStates(countryCode: number): Observable<State[]> {
    return this.httpClient.get<State[]>(this.url + countryCode + "/states");
  }
  
   getOrders(email: string): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.url2 + email);
  }
  
}
