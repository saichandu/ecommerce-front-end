import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css']
})
export class OrderPlacedComponent implements OnInit {

  orderTrackingNumber : any = "";
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderTrackingNumber = this.route.snapshot.paramMap.get('orderTrackingNumber');
  }

  
}
