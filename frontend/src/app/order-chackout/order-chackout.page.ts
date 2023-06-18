import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrderService } from '../_services/order.service';
import { Order } from '../models/order.model';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-order-chackout',
  templateUrl: './order-chackout.page.html',
  styleUrls: ['./order-chackout.page.scss'],
})
export class OrderChackoutPage implements OnInit {

  cartItems: any[] = []; // Declare the cartItems property
  deliveryDetails: any = {}; // Declare the deliveryDetails property
  deliveryMethod: string = 'pickup'; // Declare and initialize the deliveryMethod property
  paymentMethod: string = 'cash'; // Declare and initialize the paymentMethod property

  order: Order = {
    order_Product_ID: '',
    order_Product_Quantity: 100,
    order_Customer: '',
    order_Customer_Contact: '',
    order_Customer_Address: '',
    order_Type_Delivery: false,
    order_Type_Pay: false,
    order_Product_total_Price: 100,
    order_User_ID: '',
    order_Date: new Date()
  };

  constructor(private orderService: OrderService,
    private router: Router,
    private navCtrl: NavController) {}

  ngOnInit(): void {
    // Initialize cartItems array with data
    this.cartItems = [
      // Your cart items data here
    ];
  }

  removeFromCart(item: any): void {
    // Remove item from cartItems array
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getTotal(): number {
    // Calculate total price of items in cart
    let total = 0;
    for (const item of this.cartItems) {
      total += item.product_price * item.product_quantity;
    }
    return total;
  }


  placeOrder(): void {
    // Get the delivery details, delivery method, and payment method
    const deliveryDetails = this.deliveryDetails;
    const deliveryMethod = this.deliveryMethod;
    const paymentMethod = this.paymentMethod;

    // Combine the delivery details, cart items, and other order information
    const orderData = {
      deliveryDetails,
      // cartItems: this.cartItems,
      deliveryMethod,
      paymentMethod
    };

    // Perform the order placement logic here
    console.log('Place order:', orderData);
    window.sessionStorage.setItem("orderData",JSON.stringify(orderData))
    this.router.navigate(['/order-chackout2']);
    
  }

  isDeliveryMethodSelected(method: string): boolean {
    return this.deliveryMethod === method;
  }
  
  goBack() {
    this.navCtrl.back();
  }
}
