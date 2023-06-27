import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user.model';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-personnel-details',
  templateUrl: './personnel-details.page.html',
  styleUrls: ['./personnel-details.page.scss'],
})
export class PersonnelDetailsPage implements OnInit {
  currentUser: user = {
    personnel_fname: '',
    personnel_lname: '',
    personnel_caedID: '',
    personnel_phone: '',
    personnel_email: '',
    personnel_username: '',
    personnel_password: '',
    personnel_img: ''
  };
  currentRole: string = '';
  loggedInUserRole: string = '';

  message = '';
  defaultImage = 'assets/timered.png';

  constructor(
    private token: TokenStorageService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.getUser(userId);
    this.getCurrentUserRole();
    this.loggedInUserRole = this.token.getUser().roles[0];
  }

  getUser(id: string): void {
    this.userService.get(id).subscribe({
      next: (data) => {
        this.currentUser = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  getCurrentUserRole(): void {
    const user = this.token.getUser();
    this.currentRole = user.roles[0]; // Assuming the user has only one role
  }

  editUser(userId: number) {
    this.router.navigate(['/personnel-edit', userId]);
  }

  updateUser(): void {
    this.message = '';

    this.userService.update(this.currentUser.id, this.currentUser).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'This product was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/list']);
      },
      error: (e) => console.error(e)
    });
  }

  getSafeImageURL(image: string | undefined): SafeUrl {
    if (image) {
      return this.sanitizer.bypassSecurityTrustUrl("http://localhost:8080/uploads/" + image);
    }
    return this.defaultImage;
  }

  goBack() {
    this.navCtrl.back();
  }
}
