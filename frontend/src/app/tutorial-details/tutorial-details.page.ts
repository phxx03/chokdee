import { Component, Input, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/_services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';
import { NavController } from '@ionic/angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.page.html',
  styleUrls: ['./tutorial-details.page.scss'],
})
export class TutorialDetailsPage implements OnInit {

  @Input() viewMode = false;

  @Input() currentProduct: Tutorial = {
    product_name: '',
    product_brand: '',
    product_description: '',
    product_price: 20,
    product_img: '',
    product_quantity: 100,
    product_other_detail: '',
    product_published: false
  };
  
  message = '';
  defaultImage = ''; // เส้นทางไปยังรูปภาพตัวอย่าง

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getProduct(this.route.snapshot.params["id"]);
    }
  }



  getProduct(id: string): void {
    this.tutorialService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduct = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  editProduct(productId: number) {
    this.router.navigate(['/product-edit', productId]);
  }

  updatePublished(status: boolean): void {
    const data = {
      product_name: this.currentProduct.product_name,
      product_brand: this.currentProduct.product_brand,
      product_description: this.currentProduct.product_description,
      product_price: this.currentProduct.product_price,
      product_img: this.currentProduct.product_img,
      product_quantity: this.currentProduct.product_quantity,
      product_other_detail: this.currentProduct.product_other_detail,
      product_published: status
    };

    this.message = '';

    this.tutorialService.update(this.currentProduct.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentProduct.product_published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateProduct(): void {
    this.message = '';

    this.tutorialService.update(this.currentProduct.id, this.currentProduct)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This product was updated successfully!';
        },
        error: (e) => console.error(e)
      });
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

  getSafeImageURL(image: string | undefined): SafeUrl {
    if (image) {
      return this.sanitizer.bypassSecurityTrustUrl("http://localhost:8080/uploads/" + image);
    }
    return this.defaultImage;
  }

  goBack() {
    this.navCtrl.back();
  }

}