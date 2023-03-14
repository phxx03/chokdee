import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Tutorial } from '../models/tutorial.model';
import { TutorialService } from '../_services/tutorial.service';


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
    product_img: '',
    product_quantity: '',
    product_other_detail: '',
    product_published: false
  };
  submitted = false;

  constructor(private userService: UserService,private tutorialService: TutorialService) { }

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
      product_img: this.product.product_img,
      product_quantity: this.product.product_quantity,
      product_other_detail: this.product.product_other_detail
    };

    this.tutorialService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      product_name: '',
      product_brand: '',
      product_description: '',
      product_img: '',
      product_quantity: '',
      product_other_detail: '',
      product_published: false
    };
  }

}