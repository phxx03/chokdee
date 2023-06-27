import { Component, OnInit } from '@angular/core';
import { Tutorial } from '../models/tutorial.model';
import { TutorialService } from '../_services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.page.html',
  styleUrls: ['./tutorials-list.page.scss'],
})
export class TutorialsListPage implements OnInit {
  products?: Tutorial[];
  currentProduct: Tutorial = {};
  currentIndex = -1;
  searchText: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  defaultImage = 'assets\timered.png'; // เส้นทางไปยังรูปภาพตัวอย่าง

  constructor(
    private tutorialService: TutorialService,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  goToDetailPage(productID: number) {
    this.router.navigate(['/details', productID]);
  }

  retrieveProducts(): void {
    this.tutorialService.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (e) => console.error(e),
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
    this.tutorialService.deleteAll().subscribe({
      next: (res) => {
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }

  searchProduct_name(): void {
    this.currentProduct = {};
    this.currentIndex = -1;

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
          return a.product_quantity - b.product_quantity;
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
