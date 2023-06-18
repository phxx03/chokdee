import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: any = {
    personnel_fname: null,
    personnel_lname: null,
    personnel_caedID: null,
    personnel_phone: null,
    personnel_email: null,
    personnel_username: null,
    personnel_password: null,
    personnel_img: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  selectedImage: File | null = null;
  isSignUpSuccessful = false;

  selectedFiles: FileList | undefined;
  currentFile: File | undefined;
  progress = 0;
  message = '';

  fileInfos: Observable<any> | undefined;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private authService: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit(): void {
    this.fileInfos = this.authService.getFiles();
  }

  onSubmit(): void {
    const {
      personnel_fname,
      personnel_lname,
      personnel_caedID,
      personnel_phone,
      personnel_email,
      personnel_username,
      personnel_password,
      personnel_img
    } = this.form;

    // Check if a file is selected
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const file = this.selectedFiles.item(0);
      if (file) {
        // Check if the file is an image (example: jpeg, png)
        if (file.type.startsWith('image/')) {
          this.currentFile = file;
          this.authService.uploadFiles(this.currentFile!).subscribe(

            (event: any) => {
              if (event.body) {
                console.log(event.body)
                this.registerUser(
                  personnel_fname,
                  personnel_lname,
                  personnel_caedID,
                  personnel_phone,
                  personnel_email,
                  personnel_username,
                  personnel_password,
                  event.body.filename
                );
              }
            },
            (err) => {
              this.progress = 0;
              this.message = 'Could not upload the file!';
              this.currentFile = undefined;
              // Handle error if file upload fails
              this.handleRegistrationError(err);
            }
          );
        } else {
          // File is not an image
          this.progress = 0;
          this.message = 'Invalid file format. Please select an image file.';
        }
      } else {
        // No file selected
        this.progress = 0;
        this.message = 'No file selected!';
      }
    } else {
      // No file selected
      this.progress = 0;
      this.message = 'No file selected!';
      // Proceed with registration without file upload
      this.registerUser(
        personnel_fname,
        personnel_lname,
        personnel_caedID,
        personnel_phone,
        personnel_email,
        personnel_username,
        personnel_password,
        personnel_img
      );
    }
  }

  registerUser(
    personnel_fname: string,
    personnel_lname: string,
    personnel_caedID: string,
    personnel_phone: string,
    personnel_email: string,
    personnel_username: string,
    personnel_password: string,
    personnel_img: string
  ): void {
    if (this.currentFile) {
      this.authService
        .register(
          personnel_fname,
          personnel_lname,
          personnel_caedID,
          personnel_phone,
          personnel_email,
          personnel_username,
          personnel_password,
          personnel_img
        )
        .subscribe(
          (data) => {
            this.isSuccessful = true;
            // Handle successful registration
          },
          (err) => {
            this.handleRegistrationError(err);
          }
        );
    }
  }

  uploadfile() {
    this.authService.uploadFiles(this.currentFile).subscribe((res) => {
      console.log(res)
    })
  }
  handleRegistrationError(err: any): void {
    this.errorMessage = err.error.message;
    this.isSignUpFailed = true;
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      this.form.personnel_img = this.selectedImage.name;
    } else {
      this.form.personnel_img = null;
    }
    this.previewImage();
  }



  previewImage() {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  goBack() {
    this.navCtrl.back();
  }

}
