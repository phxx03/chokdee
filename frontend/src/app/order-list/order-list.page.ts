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
  orders: any[] = [];
  orders_list: any = {};
  currentOrder: Order = {};
  currentIndex = -1;
  orderIds: number[] = [];
  selectedOrderId: number | undefined;

  searchQuery = '';
  deliveryStatus: string = 'all';
  searchText: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  showDeliveryOrdersOnly: boolean = false;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  group(arr: any, k: any) {
    return arr.reduce((r: any, c: any) => (r[c[k]] = [...r[c[k]] || [], c], r), {});
  }

  getOrders() {
    this.orderService.getOrders().subscribe(
      (data: Order[]) => {
        this.orders_list = this.group(data, 'order_id');
        console.log(this.orders_list)
        for (const orderId in this.orders_list) {
          const orderGroup = this.orders_list[orderId];
          if (orderGroup && orderGroup.length > 0) {
            orderGroup.forEach((order: Order) => {
              order.order_id = orderId;
            });
          }
          this.orders.push(orderGroup);
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
  }

  searchUser(): void {
    this.currentOrder = {};
    this.currentIndex = -1;

    this.orderService.findByOrder_Customer(this.searchText).subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (e) => console.error(e),
    });
  }

  shouldShowDeliveryButton(): boolean {
    return this.showDeliveryOrdersOnly || (Array.isArray(this.filteredOrders()) && this.filteredOrders().some((orderGroup: any) => {
      return orderGroup[0].order_Type_Delivery === 1 && orderGroup[0].order_Delivery_Status === 0;
    }));
    
  }

  onDeliveryButtonClick() {
    if (this.showDeliveryOrdersOnly) {
      console.log('Delivery button clicked for all orders');
    } else {
      const deliveryOrders = this.filteredOrders().filter((orderGroup: any) => {
        return orderGroup[0].order_Type_Delivery === 1 && orderGroup[0].order_Delivery_Status === 0;
      });      
      console.log('Delivery button clicked for specific orders', deliveryOrders);
    }
  }

  filteredOrders() {
    let filtered = this.orders;
  
    if (this.showDeliveryOrdersOnly) {
      filtered = filtered.filter((orderGroup: any) => {
        return orderGroup[0].order_Type_Delivery === 1 && orderGroup[0].order_Delivery_Status === null;
      });
    }
  
    if (this.searchText) {
      filtered = filtered.filter((orderGroup: any) => {
        if (orderGroup && orderGroup.length > 0 && orderGroup[0].order_id) {
          return orderGroup[0].order_id.toLowerCase().includes(this.searchText.toLowerCase());
        }
        return false;
      });
    }
  
    const sorted = filtered.sort((a: any, b: any) => {
      if (this.sortOrder === 'asc') {
        if (filtered && filtered.length > 0 && filtered[0].order_id) {
          return a[0].order_id.localeCompare(b[0].order_id);
        }
      } else if (this.sortOrder === 'desc') {
        if (filtered && filtered.length > 0 && filtered[0].order_id) {
          return b[0].order_id.localeCompare(a[0].order_id);
        }
      }
      return 0;
    });
  
    return sorted;
  }
  
  

  goBack() {
    this.navCtrl.back();
  }

}
