import { Country } from "../../common/country";
import { Order } from "../../common/order";
import { OrderItem } from "../../common/order-item";
import { Purchase } from "../../common/purchase";
import { State } from "../../common/state";
import { CartService } from "../../services/cart-service";
import { Whitespacevalidator } from "../../validators/whitespacevalidator";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, FormControl, Validators } from "@angular/forms";
import { UtilService } from "../../services/util.service";
import { CheckoutService } from "../../services/checkout.service";
import { Router } from "@angular/router";
import { WhileStatement } from "typescript";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  totalQuantity: number = 0;
  totalValue: number = 0;
  
  ccMonths : number[] = [];
  ccYears : number[] = [];
  countries : Country[] = [];
  billingStates : State[] = [];
  shippingStates : State[] = [];
  
  formgroup : FormGroup = this.formBuilder.group({});

  constructor(private formBuilder : FormBuilder, 
    private utilService : UtilService, 
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {
    this.buildform();
  }
  
  buildform(): void {
    this.formgroup = this.formBuilder.group({
        customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.minLength(2), Validators.required, Whitespacevalidator.validate]),
        lastName: new FormControl('',[Validators.minLength(2), Validators.required, Whitespacevalidator.validate]),
        email: new FormControl('',[Validators.email, Validators.required]),
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: ['']
      }),
        creditcard: this.formBuilder.group({
            cardType : [''],
            nameOnCard : [''],
            cardNumber : [''],
            securityCode : [''],
            expMonth: [''],
            expYear : ['']
        })
    });
    
    this.utilService.getCCMonths(1).subscribe(data=>this.ccMonths=data);
    this.utilService.getCCYears().subscribe(data=>this.ccYears=data);
    
    this.utilService.getCountries().subscribe(data=>this.countries = data);
    
    this.cartService.totalQuantity.subscribe(data=>this.totalQuantity = data);
    this.cartService.totalCartValue.subscribe(data=>this.totalValue = data);
  }
  
  copyShippingAddressToBillingAddress(checked: boolean) {
    if (checked) {
      this.formgroup.controls.billingAddress
            .setValue(this.formgroup.controls.shippingAddress.value);
      this.billingStates = this.shippingStates;
    } else {
      this.formgroup.controls.billingAddress.reset();
      this.billingStates = [];
    }
  }
  
  onSubmit(): void {
    if (this.formgroup.invalid) {
       this.formgroup.markAllAsTouched();
    }
    
    let placeOrder: Purchase = new Purchase();
    let customer: any;
    customer = this.formgroup.get('customer');
    placeOrder.customer = customer.value;
    
    let shippingAddress: any;
    shippingAddress = this.formgroup.get('shippingAddress');
    placeOrder.shippingAddress = shippingAddress.value;
    
    let billingAddress: any;
    billingAddress = this.formgroup.get('billingAddress');
    placeOrder.billingAddress = billingAddress.value;
    
    
    this.cartService.totalCartItems.map(temp => {placeOrder.orderItems.push(new OrderItem(temp))});
    
    placeOrder.order = new Order();
    placeOrder.order.totalQuantity = this.totalQuantity;
    placeOrder.order.totalPrice = this.totalValue;
    
    this.checkoutService.purchase(placeOrder).subscribe({
      next: response => {
        
          let cartSize = this.cartService.totalCartItems.length;
          this.cartService.totalCartItems.splice(0,cartSize);
          this.cartService.totalCartValue.next(0);
          this.cartService.totalQuantity.next(0);
          
          this.router.navigateByUrl("/orderplaced/" + response.orderTrackingNumber);
      },
      error: err => {
        alert("There was an error. Please try again");
      }
    });
  }
  
  refreshMonths(): void {
    let currentYear :number = 0;
    
    currentYear = this.formgroup.controls.creditcard.value.expYear;
    
    let month: number = 0;
    if (currentYear == new Date().getFullYear()) {
      month = new Date().getMonth() + 1;
    }
    this.utilService.getCCMonths(month).subscribe(data=>this.ccMonths=data);
  }
  
  populateStates(address: string) {
    if (address === 'billingAddress') {
      let billing: any;
      billing = this.formgroup.get(address);
      this.utilService.getStates(billing.value.country).subscribe(data=>this.billingStates=data);
    }
    if (address === 'shippingAddress') {
      let billing: any;
      billing = this.formgroup.get(address);
      this.utilService.getStates(billing.value.country).subscribe(data=>this.shippingStates=data);
    }
  }
  
  get firstNameCustomerForm() {
    return this.formgroup.get("customer.firstName");
  }
  
  get lastName() {
    return this.formgroup.get("customer.lastName");
  }
  
  get email() {
    return this.formgroup.get("customer.email");
  }
}
