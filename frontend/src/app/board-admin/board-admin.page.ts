import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Tutorial } from '../models/tutorial.model';
import { TutorialService } from '../_services/tutorial.service';
import { AuthService } from '../_services/auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.page.html',
  styleUrls: ['./board-admin.page.scss'],
})
export class BoardAdminPage implements OnInit {
  content?: string;
  product: Tutorial = {
    product_name: '',
    product_brand: '',
    product_description: '',
    product_price: 20,
    product_img: '',
    product_quantity: 100,
    product_other_detail: '',
    product_published: false
  };
  submitted = false;

  selectedFiles: FileList | undefined;
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }
  

  constructor(
    private userService: UserService,
    private tutorialService: TutorialService,
    private authService: AuthService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  saveProduct(): void {
    const data = {
      product_name: this.product.product_name,
      product_brand: this.product.product_brand,
      product_description: this.product.product_description,
      product_price: this.product.product_price,
      product_img: this.product.product_img,
      product_quantity: this.product.product_quantity,
      product_other_detail: this.product.product_other_detail
    };
  
    // Check if there are selected files
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const file = this.selectedFiles.item(0);
      if (file) {
        // Check if the file is an image
        if (file.type.startsWith('image/')) {
          // Call the uploadFiles() method from TutorialService
          this.authService.uploadFiles(file).subscribe(
            (event: any) => {
              if (event.body) {
                // Get the filename from the response
                const filename = event.body.filename;
                // Update the data object with the filename
                data.product_img = filename;
                // Call the create() method from TutorialService with the updated data
                this.tutorialService.create(data).subscribe(
                  (res) => {
                    console.log(res);
                    this.submitted = true;
                  },
                  (err) => {
                    console.error(err);
                    // Handle error during product creation
                  }
                );
                this.presentToast('เพิ่มสินค้าเรียบร้อย');
                this.reloadPage();
              }
            },
            (err) => {
              console.error(err);
              // Handle error if file upload fails
            }
          );
        } else {
          // File is not an image
          // Handle invalid file format error
        }
      }
    } else {
      // No file selected, call the create() method from TutorialService
      this.tutorialService.create(data).subscribe(
        (res) => {
          console.log(res);
          this.submitted = true;
        },
        (err) => {
          console.error(err);
          // Handle error during product creation
        }
      );
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
  

  newProduct(): void {
    this.submitted = false;
    this.product = {
      product_name: '',
      product_brand: '',
      product_description: '',
      product_price: 20,
      product_img: '',
      product_quantity: 100,
      product_other_detail: '',
      product_published: false
    };
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  
  goBack() {
    this.navCtrl.back();
  }
  
}