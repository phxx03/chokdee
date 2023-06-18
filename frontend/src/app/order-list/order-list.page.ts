import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Order } from '../models/order.model';
import { OrderService } from '../_services/order.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
  orders: any[] = []
  orders_list: any = {}
  currentOrder: Order = {};
  currentIndex = -1;
  orderIds: number[] = [];
  selectedOrderId: number | undefined;
  
  filteredOrders: Order[] = [];
  searchQuery = '';
  deliveryStatus: string = 'all';


  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  ngOnInit(): void {
    // this.retrieveOrders();
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

  viewOrderDetails(orderId: number) {
    console.log(orderId)
    this.router.navigate(['/order-history-details', orderId]);
    // if (this.orders) {
    //   const filteredOrders = this.orders.filter(order => order.order_id === orderId);
    //   if (filteredOrders.length > 0) {
    //     const order = filteredOrders[0];
    //     this.router.navigate(['/order-history-details', order.order_id]);
    //   }
    // }
  }

  // Function to retrieve orders by orderId
  getOrdersByOrderId(orderId: number): Order[] {
    if (this.orders) {
      return this.orders.filter(order => order.order_id === orderId);
    }
    return [];
  }

  retrieveOrders(): void {
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveOrders();
    this.currentOrder = {};
    this.currentIndex = -1;
  }

  setActiveOrder(order: Order, index: number): void {
    this.currentOrder = order;
    this.currentIndex = index;
  }

  removeAllOrders(): void {
    this.orderService.deleteAll().subscribe({
      next: (res) => {
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }
  SumTotalprice(data: any) {
    const total = data.reduce((accumulator: any, object: any) => {
      return accumulator + object['order_Product_Total_Price'];
    }, 0);

    return total;
    // console.log(data)
  }

  filterOrders(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
  
    if (this.searchQuery.trim() !== '') {
      this.filteredOrders = this.orders.filter((orderGroup) => {
        const order = orderGroup[0];
        const orderId = order?.order_id;
        const deliveryStatus = order?.order_Delivery_Status ? 'จัดส่งแล้ว' : 'รอการจัดส่ง';
  
        return orderId && deliveryStatus &&
          (orderId.toString().includes(this.searchQuery) || deliveryStatus.includes(this.searchQuery));
      });
    } else {
      this.filteredOrders = this.orders;
    }
  }
  
  
  
  
  

  
  goBack() {
    this.navCtrl.back();
  }

}
