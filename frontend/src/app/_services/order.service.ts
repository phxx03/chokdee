import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { map } from 'rxjs/operators';

const baseUrl = 'http://localhost:8080/api/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(baseUrl);
  }

  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(baseUrl);
  }

  getOrderDetails(orderId: string): Observable<any[]> {
    const url = `${baseUrl}/orders/${orderId}`;
    return this.http.get<any[]>(url).pipe();
  }

  get(id: any): Observable<Order> {
    return this.http.get<Order>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(order_id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${order_id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByOrder_Customer(order_id: any): Observable<Order[]> {
    return this.http.get<Order[]>(`${baseUrl}?order_id=${order_id}`);
  }

}