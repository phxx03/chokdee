import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-popup-cart',
  templateUrl: './popup-cart.page.html',
  styleUrls: ['./popup-cart.page.scss'],
})
export class PopupCartPage implements OnInit {
  @Input() maxQuantity!: number;
  quantity: number = 1;
  isQuantityExceeded: boolean = false;
  @Input() cartProductName!: string; // เปลี่ยนชื่อ Input property เป็น cartProductName
  @Input() cartProductPrice!: number;
  @Input() cartProductQuantity!: number;
  @Input() cartProductImg!: string;
  defaultImage = 'assets\timered.png'; 


  constructor(private modalController: ModalController, private toastController: ToastController) {}

  ngOnInit() {}

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
    }
  }

  async addToCartWithQuantity() {
    if (this.quantity > 0 && this.quantity <= this.maxQuantity) {
      this.modalController.dismiss(this.quantity);
    } else {
      this.showToast('สินค้าไม่เพียงพอ');
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }

  getSafeImageURL(image: string | undefined): SafeUrl {
    if (image) {

      return "http://localhost:8080/uploads/" + image
    }
    return this.defaultImage;
  }

}