import { Component, Input, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/_services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';

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
  product_img = '';
  product_quantity = '';
  product_other_detail = '';
  product_published = false ;  
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router) { }

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

  updatePublished(status: boolean): void {
    const data = {
      product_name: this.currentProduct.product_name,
      product_brand: this.currentProduct.product_brand,
      product_description: this.currentProduct.product_description,
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
          this.router.navigate(['/list']);
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

}
