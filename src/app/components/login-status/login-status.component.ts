import { CartService } from "../../services/cart-service";
import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: any = "";
  session: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthService, private cartService: CartService) { }

  ngOnInit(): void {

    // Subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    );
    
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuthService.getUser().then(
        (res) => {
          this.userFullName = res.name;
          
          this.session.setItem("useremail", res.email || "");
        }
      );
    }
  }

  logout() {
    this.oktaAuthService.signOut();
    
    this.session.removeItem('totalcartitems');
    this.cartService.totalCartItems = [];
    this.cartService.totalCartValue.next(0);
    this.cartService.totalQuantity.next(0);
  }
}
