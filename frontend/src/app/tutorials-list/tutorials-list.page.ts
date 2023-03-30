import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Tutorial } from '../models/tutorial.model';
import { TutorialService } from '../_services/tutorial.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.page.html',
  styleUrls: ['./tutorials-list.page.scss'],
})

export class TutorialsListPage implements OnInit {

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

  constructor(
    private tutorialService: TutorialService,
    private router: Router, // inject Router และ ActivatedRoute เข้ามาใน constructor
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.retrieveProducts();
    // this.getProducts();
  }

  // getProducts() {
  //   this.tutorialService.getProducts()
  //   .subscribe(products => this.products = products);
  // }

  goToDetailPage(productID: number) {
    this.router.navigate(['/details', productID]); // ใช้ Router.navigate() เพื่อนำทางไปยังหน้าอื่นๆ โดยกำหนด path และ parameter
  }

  retrieveProducts(): void {
    this.tutorialService.getAll()
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveProducts();
    this.currentProduct = {};
    this.currentIndex = -1;
  }

  setActiveProduct(product: Tutorial, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  removeAllProducts(): void {
    this.tutorialService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchProduct_name(): void {
    this.currentProduct = {};
    this.currentIndex = -1;

    this.tutorialService.findByProduct_name(this.product_name)
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}