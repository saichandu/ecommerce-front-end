import {Product} from './product';

export class CartItem {
    id: number = 0;
    name: string = "";
    unitPrice: number = 0;
    imageUrl: string = "";
  
    numberOfUnits: number = 0;
  
    constructor(product: Product) {
      this.id = product.id;
      this.name = product.name;
      this.unitPrice = product.unitPrice;
      this.imageUrl = product.imageUrl;
      
      this.numberOfUnits = 1;
    }
}
