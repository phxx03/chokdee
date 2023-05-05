import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA, Input  } from '@angular/core';
import { user } from 'src/app/models/user.model';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personnel-details',
  templateUrl: './personnel-details.page.html',
  styleUrls: ['./personnel-details.page.scss'],
})
export class PersonnelDetailsPage implements OnInit {

  @Input() viewMode = false;

  @Input() currentUser: user = {
    personnel_fname: '',
    personnel_lname: '',
    personnel_caedID: '',
    personnel_phone: '',
    personnel_email: '',
    personnel_username: '',
    personnel_password: '',
    personnel_img: ''
  };

  message = '';

  constructor(
    private userService: UserService,
    private router: Router, // inject Router และ ActivatedRoute เข้ามาใน constructor
    private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
      if (!this.viewMode) {
        this.message = '';
        this.getUser(this.route.snapshot.params["id"]);
      }
    }

    getUser(id: string): void {
      this.userService.get(id)
        .subscribe({
          next: (data) => {
            this.currentUser = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    }
  
    editUser(userId: number) {
      this.router.navigate(['/personnel-edit', userId]);
    }
  
    // updatePublished(status: boolean): void {
    //   const data = {
    //     personnel_fname: this.currentUser.personnel_fname,
    //     personnel_lname: this.currentUser.personnel_lname,
    //     personnel_caedID: this.currentUser.personnel_caedID,
    //     personnel_phone: this.currentUser.personnel_phone,
    //     personnel_email: this.currentUser.personnel_email,
    //     personnel_username: this.currentUser.personnel_username,
    //     personnel_password: this.currentUser.personnel_password,
    //     personnel_img: this.currentUser.personnel_img,
    //   };
  
    //   this.message = '';
  
    //   this.userService.update(this.currentUser.id, data)
    //     .subscribe({
    //       next: (res) => {
    //         console.log(res);
    //         this.currentUser.product_published = status;
    //         this.message = res.message ? res.message : 'The status was updated successfully!';
    //       },
    //       error: (e) => console.error(e)
    //     });
    // }
  
    updateUser(): void {
      this.message = '';
  
      this.userService.update(this.currentUser.id, this.currentUser)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.message = res.message ? res.message : 'This product was updated successfully!';
          },
          error: (e) => console.error(e)
        });
    }
  
    deleteUser(): void {
      this.userService.delete(this.currentUser.id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/list']);
          },
          error: (e) => console.error(e)
        });
    }
  
  }