import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.page.html',
  styleUrls: ['./order-cart.page.scss'],
})
export class OrderCartPage implements OnInit {
  cartItems: any;
  
  defaultImage = 'assets\timered.png';

  constructor(private router: Router,private navCtrl: NavController) {}

  ngOnInit(): void {
    let data = window.sessionStorage.getItem("cartItem") || "[]"
    console.log("data",JSON.parse(data))
    this.cartItems = JSON.parse(data)
    this.cartItems = this.cartItems.map((c: any) => ({...c,product_cartselect:1}))
    console.log(this.cartItems)
  }

  removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getTotal(): number {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.product_price * item.product_cartselect;
    }
    return total;
  }

  goToDeliveryForm(): void {
    window.sessionStorage.setItem("cartItemALL",JSON.stringify(this.cartItems))
    window.sessionStorage.setItem("cartItem",JSON.stringify(this.cartItems))
    this.router.navigate(['/order-chackout']); // Navigate to the order-chackout page

  }
  
  getSafeImageURL(image: string | undefined): SafeUrl {
    if (image) {

      return "http://localhost:8080/uploads/" + image
    }
    return this.defaultImage;
  }
  
  goBack() {
    this.navCtrl.back();
  }

  decreaseQuantity(item: any) {
    if (item.product_cartselect > 1) {
      item.product_cartselect--;
    }
  }

  increaseQuantity(item: any) {
    if (item.product_quantity > item.product_cartselect){
    item.product_cartselect++;}
  }
}