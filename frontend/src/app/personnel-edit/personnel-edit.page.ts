import { Component, OnInit } from '@angular/core';
import { user } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { NavController } from '@ionic/angular';

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

  selectedFiles: FileList | undefined;
  selectedFileName: string | undefined;
  selectedImage: string | undefined;
  

  constructor(
    private userService: UserService,
    private router: Router, // inject Router และ ActivatedRoute เข้ามาใน constructor
    private route: ActivatedRoute,
    private authService: AuthService,
    private navCtrl: NavController
     ) { }

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

    const data = {
      // Update personnel data from form inputs
      personnel_fname: this.currentUser.personnel_fname,
      personnel_lname: this.currentUser.personnel_lname,
      personnel_caedID: this.currentUser.personnel_caedID,
      personnel_phone: this.currentUser.personnel_phone,
      personnel_email: this.currentUser.personnel_email,
      personnel_username: this.currentUser.personnel_username,
      personnel_password: this.currentUser.personnel_password,
      personnel_img: this.currentUser.personnel_img,
    };

    // Check if there are selected files
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const file = this.selectedFiles.item(0);
      if (file) {
        // Check if the file is an image
        if (file.type.startsWith('image/')) {
          // Call the uploadFiles() method from AuthService
          this.authService.uploadFiles(file).subscribe(
            (event: any) => {
              if (event.body) {
                // Get the filename from the response
                const filename = event.body.filename;
                // Update the data object with the filename
                data.personnel_img = filename;
                // Call the update() method from UserService with the updated data
                this.userService.update(this.currentUser.id, data).subscribe(
                  (res) => {
                    console.log(res);
                    this.message = res.message ? res.message : 'This Personnel was updated successfully!';
                    this.router.navigate(['/personnel-list']);
                  },
                  (err) => {
                    console.error(err);
                    // Handle error during personnel update
                  }
                );
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
      // No file selected, call the update() method from UserService
      this.userService.update(this.currentUser.id, data).subscribe(
        (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Personnel was updated successfully!';
          this.router.navigate(['/personnel-list']);
        },
        (err) => {
          console.error(err);
          // Handle error during personnel update
        }
      );
    }
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
      };
      reader.readAsDataURL(file);
    }
  }
  
  goBack() {
    this.navCtrl.back();
  }
  
}
