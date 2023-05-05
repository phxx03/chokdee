import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: any = {
    // username: null,
    // email: null,
    // password: null
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

//   onSubmit(): void {
//     const { personnel_fname,
//       personnel_lname,
//       personnel_caedID,
//       personnel_phone,
//       personnel_email,
//       personnel_username,
//       personnel_password,
//       personnel_img } = this.form;

//     this.authService.register(
//       personnel_fname,
//       personnel_lname,
//       personnel_caedID,
//       personnel_phone,
//       personnel_email,
//       personnel_username,
//       personnel_password,
//       personnel_img).subscribe({
//       next: data => {
//         console.log(data);
//         this.isSuccessful = true;
//         this.isSignUpFailed = false;
//       },
//       error: err => {
//         this.errorMessage = err.error.message;
//         this.isSignUpFailed = true;
//       }
//     });
//   }
// }
  onSubmit(): void {
    const {personnel_fname,
            personnel_lname,
            personnel_caedID,
            personnel_phone,
            personnel_email,
            personnel_username,
            personnel_password,
            personnel_img} = this.form;

    this.authService.register(
      personnel_fname,
      personnel_lname,
      personnel_caedID,
      personnel_phone,
      personnel_email,
      personnel_username,
      personnel_password,
      personnel_img).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}