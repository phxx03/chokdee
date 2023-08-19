import { Component, Input, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/_services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { AuthService } from 'src/app/_services/auth.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {
 
  products?: Tutorial[];
  currentProduct: Tutorial = {};
  currentIndex = -1;
  product_name = '';
  product_brand = '';
  product_description = '';
  product_price = 20;
  product_img = '';
  product_quantity = 100;
  product_other_detail = '';
  product_published = false ;  
  message = '';
  
  selectedFiles: FileList | undefined;
  selectedFileName: string | undefined;
  selectedImage: string | undefined;

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getProduct(id);
  }

  getProduct(id: string): void {
    this.tutorialService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduct = data;
          console.log(this.currentProduct);
        },
        error: (e) => console.error(e)
      });
  }

  // updatePublished(status: boolean): void {
  //   const data = {
  //     product_name: this.currentProduct.product_name,
  //     product_brand: this.currentProduct.product_brand,
  //     product_description: this.currentProduct.product_description,
  //     product_price: this.currentProduct.product_price,
  //     product_img: this.currentProduct.product_img,
  //     product_quantity: this.currentProduct.product_quantity,
  //     product_other_detail: this.currentProduct.product_other_detail,
  //     product_published: status
  //   };

  //   this.message = '';

  //   this.tutorialService.update(this.currentProduct.id, data)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.currentProduct.product_published = status;
  //         this.message = res.message ? res.message : 'The status was updated successfully!';
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  updateProduct(): void {
    this.message = '';


    if (this.currentProduct && this.currentProduct.product_quantity !== undefined && this.currentProduct.product_price !== undefined) {
      // Check if quantity and price are greater than or equal to 0
      if (this.currentProduct.product_quantity <= 0 || this.currentProduct.product_price < 0) {
        this.handleUpdateError({ message: 'กรุณากรอกข้อมูลที่ถูกต้อง' });
        return;
      }
    }
  
    const data = {
      product_name: this.currentProduct.product_name,
      product_brand: this.currentProduct.product_brand,
      product_description: this.currentProduct.product_description,
      product_price: this.currentProduct.product_price,
      product_img: this.currentProduct.product_img,
      product_quantity: this.currentProduct.product_quantity,
      product_other_detail: this.currentProduct.product_other_detail,
      product_published: this.currentProduct.product_published
    };
  
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const file = this.selectedFiles.item(0);
      if (file) {
        if (file.type.startsWith('image/')) {
          this.authService.uploadFiles(file).subscribe(
            (event: any) => {
              if (event.body) {
                const filename = event.body.filename;
                data.product_img = filename;
                this.updateProductData(data);
              }
            },
            (err) => {
              console.error(err);
              // Handle error if file upload fails
              this.handleUpdateError(err);
            }
          );
        } else {
          // File is not an image
          this.handleUpdateError('Invalid file format. Please select an image file.');
        }
      }
    } else {
      this.updateProductData(data);
    }
  }

  updateProductData(data: any): void {
    this.tutorialService.update(this.currentProduct.id, data)
      .subscribe(
        (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This product was updated successfully!';
          this.router.navigate(['/list']);
        },
        (err) => {
          this.handleUpdateError(err);
        }
      );
  }
  
  handleUpdateError(error: any): void {
    this.message = error.message ? error.message : 'An error occurred during the product update.';
    console.error(error);
  }



  deleteProduct(): void {
    this.tutorialService.delete(this.currentProduct.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/list']);
        },
        error: (e) => console.error(e)
      });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.selectedFileName = this.selectedFiles.item(0)?.name;
      this.readSelectedFile();
    } else {
      this.selectedFileName = undefined;
      this.selectedImage = undefined;
    }
  }
  
  
  readSelectedFile(): void {
    const file = this.selectedFiles?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
  
        if (this.currentProduct && this.currentProduct.product_quantity !== undefined && this.currentProduct.product_price !== undefined) {
          // Check if quantity and price are greater than or equal to 0
          if (this.currentProduct.product_quantity <= 0 || this.currentProduct.product_price < 0) {
            this.selectedImage = undefined;
            this.handleUpdateError({ message: 'กรุณากรอกข้อมูลที่ถูกต้อง' });
          }
        }
      };
      reader.readAsDataURL(file);
    }
  }

  isInvalidQuantity(): boolean {
    return this.currentProduct && this.currentProduct.product_quantity !== undefined && this.currentProduct.product_quantity <= 0;
  }
  
  isInvalidPrice(): boolean {
    return this.currentProduct && this.currentProduct.product_price !== undefined && this.currentProduct.product_price <= 0;
  }

  goBack() {
    this.navCtrl.back();
  }

}
