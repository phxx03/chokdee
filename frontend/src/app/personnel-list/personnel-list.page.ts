import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { user } from '../models/user.model';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-personnel-list',
  templateUrl: './personnel-list.page.html',
  styleUrls: ['./personnel-list.page.scss'],
})
export class PersonnelListPage implements OnInit {
  users?: user[];
  currentUser: user = {};
  currentIndex = -1;
  personnel_fname = '';
  personnel_lname = '';
  personnel_caedID = '';
  personnel_phone = '';
  personnel_email = '';
  personnel_username = '';
  personnel_password = '';
  personnel_img = '';


  constructor(
    private userService: UserService,
    private router: Router, // inject Router และ ActivatedRoute เข้ามาใน constructor
    private route: ActivatedRoute,
    private http: HttpClient,
    ) { }

  ngOnInit(): void {
    this.retrieveUsers();
    // this.getUsers().subscribe((data) => {
    //   console.log(data);
  }
    // this.retrievePersonnels();
    // this.getUsers().subscribe((data) => {
    //   console.log(data);
    // });
  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.users = data; // กำหนดค่าให้กับ personnels ด้วย array ที่ได้รับจาก API
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // getUsers() {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.get('http://localhost:8080/api/users', { headers: headers });
  // }

  goToDetailPage(userID: number) {
    this.router.navigate(['/personnel-details', userID]); // ใช้ Router.navigate() เพื่อนำทางไปยังหน้าอื่นๆ โดยกำหนด path และ parameter
  }

  // retrievePersonnels(): void {
  //   this.userService.getAll()
  //     .subscribe({
  //       next: (data) => {
  //         this.personnels = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  setActiveUser(user: user, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  removeAllUsers(): void {
    this.userService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  // searchProduct_name(): void {
  //   this.currentProduct = {};
  //   this.currentIndex = -1;

  //   this.tutorialService.findByProduct_name(this.product_name)
  //     .subscribe({
  //       next: (data) => {
  //         this.products = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

}