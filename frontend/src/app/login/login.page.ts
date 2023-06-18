import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService} from '../_services/token-storage.service';
import { UserService} from '../_services/user.service';
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
  errorMessage = '';
  roles: string[] = [];

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

  async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      header: 'ข้อมูลไม่ถูกต้อง',
      message: message,
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          icon: 'checkmark-sharp',
          handler: () => { console.log('ลองอีกครั้ง'); }
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
        this.navCtrl.navigateRoot('/home'); // เด็งไปหน้า Home
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.presentToast(this.errorMessage);
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
