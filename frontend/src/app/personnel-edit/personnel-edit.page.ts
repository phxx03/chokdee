import { Component, OnInit } from '@angular/core';
import { user } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-personnel-edit',
  templateUrl: './personnel-edit.page.html',
  styleUrls: ['./personnel-edit.page.scss'],
})
export class PersonnelEditPage implements OnInit {

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
  message = '';

  constructor(
    private userService: UserService,
    private router: Router, // inject Router และ ActivatedRoute เข้ามาใน constructor
    private route: ActivatedRoute ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.getPersonnel(id);
  }
  getPersonnel(id: string): void {
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log(this.currentUser);
        },
        error: (e) => console.error(e)
      });
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
  //     personnel_img: this.currentUser.personnel_img
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

  updatePersonnel(): void {
    this.message = '';

    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Personnel was updated successfully!';
          this.router.navigate(['/personnel-list']);
        },
        error: (e) => console.error(e)
      });
  }

  deletePersonnel(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/personnel-list']);
        },
        error: (e) => console.error(e)
      });
  }

}
