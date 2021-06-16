import { Order } from "../../common/order";
import { UtilService } from "../../services/util.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  session: Storage = sessionStorage;
  orders: Order[] = [];
  
  constructor(private utilService: UtilService) { }

  ngOnInit(): void {
    this.utilService.getOrders(this.session.getItem('useremail') || "").subscribe(data=>{this.orders = data});
  }

}
