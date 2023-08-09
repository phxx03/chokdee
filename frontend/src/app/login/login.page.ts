import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  isLoginSuccessful = false; // เพิ่มตัวแปร isLoginSuccessful
  errorMessage = '';
  roles: string[] = [];
  showSuccessMessage = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    public toastController: ToastController,
    public navCtrl: NavController
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  async presentToast(message: string, isSuccess: boolean): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: isSuccess ? 'success' : 'danger',
      position: 'top'
    });
    toast.present();
  }

  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: 'เข้าสู่ระบบสำเร็จ',
      position: 'middle',
      duration: 2000,
      color: 'success',
      animated: true,
      buttons: [
        {
          side: 'end',
          text: 'ปิด',
          role: 'cancel'
        }
      ]
    });

    toast.present();
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.presentToast('เข้าสู่ระบบสำเร็จ', true); // แสดง Toast เมื่อเข้าสู่ระบบสำเร็จ\
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isLoginSuccessful = false; // ตั้งค่า isLoginSuccessful เป็น false
        this.presentToast('เข้าสู่ระบบไม่สำเร็จ', false); // แสดง Toast เมื่อเข้าสู่ระบบไม่สำเร็จ
      }
    });
  }

  reloadPage(): void {
    window.location.href="home";
  }
}
