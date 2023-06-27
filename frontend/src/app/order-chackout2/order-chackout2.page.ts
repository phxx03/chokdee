import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OrderService } from '../_services/order.service';
import { Order } from '../models/order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-chackout2',
  templateUrl: './order-chackout2.page.html',
  styleUrls: ['./order-chackout2.page.scss'],
})
export class OrderChackout2Page implements OnInit {
  deliveryDetails: any;
  cartItems: any[] = [];
  totalPrice: number = 0;
  deliveryType: string = 'pickup'; // เพิ่มตัวแปร deliveryType เพื่อเก็บค่าการเลือก pickup หรือ delivery
  paymentType: string = 'cash'; // เพิ่มตัวแปร paymentType เพื่อเก็บค่าการเลือก cash หรือ transfer
  deliveryMethod: string = ''; // Declare and initialize the deliveryMethod property
  paymentMethod: string = ''; // Declare and initialize the paymentMethod property
  

  order: Order = {
    order_Product_ID: '',
    order_Product_Quantity: 0,
    order_Customer: '',
    order_Customer_Contact: '',
    order_Customer_Address: '',
    order_Type_Delivery: false,
    order_Type_Pay: false,
    order_Product_total_Price: 0,
    order_User_ID: '',
    order_Date: new Date()
  };

  submitted = false;

  constructor(
    private orderService: OrderService, 
    private navCtrl: NavController, 
    private router: Router) {
    // กำหนดค่าเริ่มต้นให้กับข้อมูลการจัดส่ง (แก้ไขตามข้อมูลที่คุณต้องการ)
    this.deliveryDetails = {
      order_Customer: '',
      order_Customer_Address: '',
      order_Customer_Contact: '',
    };
  }

  ngOnInit() {
    let data = window.sessionStorage.getItem('cartItemALL') || '[]';
    let data2 = window.sessionStorage.getItem('orderData') || '{}';
    this.cartItems = JSON.parse(data);
    this.totalPrice = this.calculateTotalPrice();
    let orderData = JSON.parse(data2);
    console.log(orderData.deliveryDetails);
    this.deliveryDetails = orderData.deliveryDetails;
    this.deliveryMethod = orderData.deliveryMethod;
    this.paymentMethod = orderData.paymentMethod;

    
  }

  calculateTotalPrice(): number {
    let total = 0;
    for (const item of this.cartItems) {
      console.log(item.product_price, item.product_cartselect);
      total += item.product_price * item.product_cartselect;
    }
    return total;
  }

  placeOrder(): void {
    // สร้างอาเรย์ order_Product_ID จาก cartItems
    const order_Product_ID: string[] = this.cartItems.map(item => item.id.toString());
    // คำนวณจำนวนสินค้าทั้งหมด
    const order_Product_Quantity: number = this.cartItems.reduce((total, item) => total + item.product_cartselect, 0);
  
     // กำหนดค่า order_Type_Delivery ตามค่าที่เลือกใน deliveryMethod
    let order_Type_Delivery: boolean;
    if (this.deliveryMethod === 'pickup') {
      order_Type_Delivery = false;
    } else if (this.deliveryMethod === 'delivery') {
      order_Type_Delivery = true;
    } else {
      order_Type_Delivery = false; // หรือค่าเริ่มต้นที่คุณต้องการให้เป็นไปตามกรณีนี้
    }

    // กำหนดค่า order_Type_Pay ตามค่าที่เลือกใน paymentMethod
    let order_Type_Pay: boolean;
    if (this.paymentMethod === 'cash') {
      order_Type_Pay = false;
    } else if (this.paymentMethod === 'transfer') {
      order_Type_Pay = true;
    } else {
      order_Type_Pay = false; // หรือค่าเริ่มต้นที่คุณต้องการให้เป็นไปตามกรณีนี้
    }


  
    // สร้างออบเจ็กต์ Order จาก deliveryDetails และ order_Product_ID
    const order: Order = {
      order_Customer: this.deliveryDetails.order_Customer,
      order_Customer_Address: this.deliveryDetails.order_Customer_Address,
      order_Customer_Contact: this.deliveryDetails.order_Customer_Contact,
      order_Product_ID: order_Product_ID.join(), // ใช้ join() เพื่อรวมสมาชิกในอาเรย์เป็นสตริงเดียว
      order_Product_total_Price: this.totalPrice,
      order_Product_Quantity: order_Product_Quantity,
      order_Type_Delivery: order_Type_Delivery,
      order_Type_Pay: order_Type_Pay,
      order_User_ID: '',
      order_Date: new Date()
    };
  
    const data: any = {
      order_data: this.cartItems,
      order_Customer: this.deliveryDetails.order_Customer,
      order_Customer_Address: this.deliveryDetails.order_Customer_Address,
      order_Customer_Contact: this.deliveryDetails.order_Customer_Contact,
      order_Product_total_Price: this.totalPrice,
      order_Product_Quantity: order_Product_Quantity,
      order_Type_Delivery: order_Type_Delivery,
      order_Type_Pay: order_Type_Pay,
      order_User_ID: '',
      order_Date: new Date()
    }
    console.log('มันมีข้อมูลอยู่นะ', order); // ใช้สำหรับตรวจสอบข้อมูลที่สร้างขึ้นใน console
  
    // ทำสิ่งที่คุณต้องการกับออบเจ็กต์ order ที่สร้างขึ้น เช่น ส่งไปยังเซิร์ฟเวอร์
    this.orderService.create(data)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  goBack() {
    this.navCtrl.back();
  }
}
