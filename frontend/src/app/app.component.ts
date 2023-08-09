import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { MenuController } from '@ionic/angular';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  personnel_username?: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private menuCtrl: MenuController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.personnel_username = user.personnel_username;
    }
  }

  openMenu(): void {
    this.menuCtrl.open();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.checkLoginStatus();
    this.router.navigate(['/']); // เปลี่ยนเส้นทางไปยังหน้าหลักหรือหน้าอื่นตามที่ต้องการให้ผู้ใช้เข้าถึงหลังจากล็อกอินหรือล็อกเอาท์
  }

  goToProfile(): void {
    this.router.navigate(['/profile']); // เปลี่ยนเส้นทางไปยังหน้าหลักหรือหน้าอื่นตามที่ต้องการให้ผู้ใช้เข้าถึงหลังจากล็อกอินหรือล็อกเอาท์
  }

  home(): void {
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
