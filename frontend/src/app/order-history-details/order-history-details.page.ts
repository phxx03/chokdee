import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OrderService } from 'src/app/_services/order.service';
import { Order } from 'src/app/models/order.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-order-history-details',
  templateUrl: './order-history-details.page.html',
  styleUrls: ['./order-history-details.page.scss'],
})
export class OrderHistoryDetailsPage implements OnInit {
  currentOrder: Order = {};
  orderProducts: any[] = [];
  message = '';
  orders_list: any = {}
  orders: any[] = []
  orderIds: number[] = [];

  
    order_id= 0;
    order_Customer= '';
    order_Customer_Address= '';
    order_Customer_Contact= '';
    order_Product_ID= '';
    order_Type_Delivery= false;
    order_Delivery_Status= false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private orderService: OrderService,
    private router: Router,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const orderId = params['id'];
      console.log(orderId)
      this.loadOrderDetails(orderId);
    });
    this.getOrders();
  }

  group(arr: any, k: any) {
    return arr.reduce((r: any, c: any) => (r[c[k]] = [...r[c[k]] || [], c], r), {});
  }

  getOrders() {
    this.orderService.getOrders().subscribe(
      (data: Order[]) => {
        // this.orders = data;
        this.orders_list = this.group(data, 'order_id');
        console.log(this.orders_list)
        for (const obj in this.orders_list) {
          console.log(this.orders_list[obj])
          this.orders.push(this.orders_list[obj])
        }
        console.log(this.orders)
        this.orderIds = this.getUniqueOrderIds(data);

      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUniqueOrderIds(orders: Order[]): number[] {
    const orderIds = orders.map((order) => order.order_id);
    return [...new Set(orderIds)];
  }

  loadOrderDetails(orderId: string): void {
    this.orderService.getOrderDetails(orderId).subscribe((orders: any[]) => {
      this.orderProducts = orders;
      this.currentOrder = orders[0];
      console.log('order : ', this.orderProducts)
    });
  }

  splitOrderProducts(order: any): any[] {
    if (order && order.order_Product_ID && order.order_Product_Quantity) {
      const productIDs = order.order_Product_ID.split(',');
      const quantities = order.order_Product_Quantity.split(',');
      const products = [];

      for (let i = 0; i < productIDs.length; i++) {
        const product = {
          order_Product_ID: productIDs[i],
          order_Product_Quantity: quantities[i]
        };
        products.push(product);
      }

      return products;
    }

    return [];
  }

  updateDeliveryStatus(status: boolean): void {
    // ทำการอัปเดตสถานะการจัดส่งในฐานข้อมูลหรือเซิร์ฟเวอร์ของคุณที่นี่
  
    // เรียกใช้งานเซอร์วิสหรือเมธอดที่เกี่ยวข้องเพื่ออัปเดตสถานะการจัดส่ง
    const orderId = this.currentOrder?.order_id; // รับ order ID จาก currentOrder

      const data = {
        order_Delivery_Status: status
      };
  
      this.orderService.update(this.currentOrder.order_id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          // if (this.currentOrder) {
            this.currentOrder.order_Delivery_Status = status;
          // }
          this.message = res.message ? res.message : 'The status was updated successfully!';
          this.presentToast('ยืนยันการจัดส่ง สำเร็จ');
        },
        error: (e) => console.error(e)
      });
    }

  
  goBack() {
    this.navCtrl.back();
  }
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  deleteOrder(): void {
    const orderId = this.currentOrder.order_id;
    const orderIdsToDelete = this.orderProducts.filter(order => order.order_id === orderId).map(order => order.id);
    for (const orderIdToDelete of orderIdsToDelete) {
      this.orderService.delete(orderIdToDelete).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    }
    this.router.navigate(['/order-list']);
  }
  
}
