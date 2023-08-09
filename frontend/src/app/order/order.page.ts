import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Tutorial } from '../models/tutorial.model';
import { TutorialService } from '../_services/tutorial.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { PopupCartPage } from '../popup-cart/popup-cart.page';


@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  products?: Tutorial[];
  currentProduct: Tutorial = {};
  currentIndex = -1;
  product_name = '';
  product_brand = '';
  product_description = '';
  product_price = 20;
  product_img = '';
  product_quantity = BigInt(100);
  product_other_detail = '';
  product_published = false;

  cartItems: any[] = [];
  cartItemCount: number = 0;
  searchText: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  defaultImage = 'assets\timered.png'; // เส้นทางไปยังรูปภาพตัวอย่าง

  currentPage = 0;
  pageSize = 10;
  isLastPage = false;

  constructor(
    private tutorialService: TutorialService,
    private toastController: ToastController,
    private router: Router,
    private navCtrl: NavController,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.retrieveProducts();
    let data = window.localStorage.getItem("cartItem") || "[]";
    console.log("data", JSON.parse(data));
    this.cartItems = JSON.parse(data);
    console.log(this.cartItems);
    this.cartItemCount = this.cartItems.length
  }

  retrieveProducts(): void {
    this.tutorialService.getAll()
      .subscribe({
        next: (data) => {
          if (data.length < this.pageSize) {
            this.isLastPage = true;
          }
          if (this.products) {
            this.products = [...this.products, ...data];
          } else {
            this.products = data;
          }
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  loadMore(event: any) {
    if (!this.isLastPage) {
      this.currentPage++;
      this.retrieveProducts();
    } else {
      event.target.disabled = true;
    }
  }

  async addToCart(item: Tutorial) {
    const existingItem = this.cartItems.find((cartItem: Tutorial) => cartItem.id === item.id);
  
    if (existingItem) {
      const availableQuantity = item.product_quantity || BigInt(0);
      const selectedQuantity = existingItem.product_cartselect || 0;
  
      if (selectedQuantity < availableQuantity) {
        const modal = await this.modalController.create({
          component: PopupCartPage,
          componentProps: {
            maxQuantity: Number(availableQuantity) - selectedQuantity,
            cartProductName: existingItem.product_name,
            cartProductPrice: existingItem.product_price,
            cartProductQuantity: existingItem.product_quantity,
            cartProductImg: existingItem.product_img
          }
        });
  
        await modal.present();
  
        const { data } = await modal.onWillDismiss();
  
        if (data) {
          existingItem.product_cartselect += data;
          this.cartItemCount = this.cartItems.reduce((total, item) => total + (item.product_cartselect || 0), 0);
          this.updateCartItems();
        }
      } else {
        this.presentToast('สินค้าไม่เพียงพอ');
      }
    } else {
      const availableQuantity = item.product_quantity || BigInt(0);
  
      if (availableQuantity === BigInt(0)) {
        this.presentToast('สินค้าไม่เพียงพอ');
        return;
      }
  
      const modal = await this.modalController.create({
        component: PopupCartPage,
        componentProps: {
          maxQuantity: Number(availableQuantity),
          cartProductName: item.product_name,
          cartProductPrice: item.product_price,
          cartProductQuantity: item.product_quantity,
          cartProductImg: item.product_img
        }
      });
  
      await modal.present();
  
      const { data } = await modal.onWillDismiss();
  
      if (data) {
        const newItem = { ...item, product_cartselect: data };
        this.cartItems.push(newItem);
        this.cartItemCount = this.cartItems.reduce((total, item) => total + (item.product_cartselect || 0), 0);
        // this.cartItemCount = this.cartItems.length;
        this.updateCartItems();
      }
    }
  }
  
  updateCartItems(): void {
    window.localStorage.setItem('cartItem', JSON.stringify(this.cartItems));
    this.cartItemCount = this.cartItems.length;
  }
  
  
  
  removeFromCart(item: Tutorial) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.cartItemCount = this.cartItems.length;
    }
  }
  

  getTotal(): number {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.product_price * (item.product_cartselect || 0);
    }
    return total;
  }
  

  goToCart() {
    this.navCtrl.navigateForward('/order-cart');
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

  searchProduct_name(): void {
    this.tutorialService.findByProduct_name(this.searchText).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (e) => console.error(e),
    });
  }

  get filteredProducts() {
    const filtered = this.products?.filter((product) =>
      product.product_name?.toLowerCase().includes(this.searchText?.toLowerCase())
    );

    const sorted = filtered?.sort((a, b) => {
      if (this.sortOrder === 'asc' || this.sortOrder === 'desc') {
        if (this.sortOrder === 'asc') {
          if (typeof a.product_name === 'string' && typeof b.product_name === 'string') {
            return a.product_name.localeCompare(b.product_name);
          }
        } else if (this.sortOrder === 'desc') {
          if (typeof a.product_name === 'string' && typeof b.product_name === 'string') {
            return b.product_name.localeCompare(a.product_name);
          }
        }
      } else if (this.sortOrder === 'quantity') {
        if (typeof a.product_quantity === 'number' && typeof b.product_quantity === 'number') {
          return b.product_quantity - a.product_quantity; // เรียงจากมากไปน้อย
        }
      }
      return 0;
    });

    return sorted;
  }


  toggleSortOrder() {
    if (this.sortOrder === 'asc') {
      this.sortOrder = 'desc';
    } else {
      this.sortOrder = 'asc';
    }
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
}
