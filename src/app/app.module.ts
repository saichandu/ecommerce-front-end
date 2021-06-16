import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../app/material/material.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service'
import { CategoryService } from './services/category.service'
import {CartService} from './services/cart-service'
import {Routes, RouterModule, Router} from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AppCartStatusComponent } from './components/app-cart-status/app-cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

import myAppConfig from './config/my-app-config';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';

const oktaConfig = Object.assign({
  onAuthRequired: (AuthGuard, injector) => {
    const router = injector.get(Router);
    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

const routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'cartdetails', component: CartDetailsComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'search/:keyword', component: ProductListComponent},  
  {path: 'checkout', component: CheckoutComponent, canActivate: [OktaAuthGuard]},
  {path: 'orderplaced/:orderTrackingNumber', component: OrderPlacedComponent},
  {path: 'myorders', component: MyOrdersComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SearchComponent,
    ProductDetailsComponent,
    AppCartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    OrderPlacedComponent,
    LoginComponent,
    LoginStatusComponent,
    MyOrdersComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService,CategoryService,CartService,{ provide: OKTA_CONFIG, useValue: oktaConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
