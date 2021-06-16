export class Order {
    id: number = 0;
    orderTrackingNumber : string = "";
    totalQuantity : number = 0;
    totalPrice: number = 0;
    status: string = "";
    dateCreated: Date = new Date();
    lastUpdated: Date = new Date();
}
