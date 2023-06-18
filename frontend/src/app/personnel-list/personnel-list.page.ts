import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { user } from '../models/user.model';

@Component({
  selector: 'app-personnel-list',
  templateUrl: './personnel-list.page.html',
  styleUrls: ['./personnel-list.page.scss'],
})
export class PersonnelListPage implements OnInit {
  users?: user[];
  currentUser: user = {};
  currentIndex = -1;

  searchQuery: string = '';
  filteredUsers: user[] = [];
  personnelList: any[] = [];
  searchText: string = '';
  defaultImage = 'assets/timered.png'; // เส้นทางไปยังรูปภาพตัวอย่าง

  constructor(
    private userService: UserService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
        this.filterUsers();
      },
      error: (e) => console.error(e),
    });
  }

  goToDetailPage(userID: any) {
    this.router.navigate(['/personnel-details', userID]);
  }

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
    this.userService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }

  filterUsers() {
    if (this.users) {
      this.filteredUsers = this.users.filter(
        (user) =>
          (user.personnel_username &&
            user.personnel_username
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) ||
          (user.personnel_email &&
            user.personnel_email
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())) ||
          (user.id &&
            user.id
              .toString()
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()))
      );
  
      // Reset current user and index
      this.currentUser = {};
      this.currentIndex = -1;
    }
  }  

  searchProduct_name(): void {
    this.currentUser = {};
    this.currentIndex = -1;

    this.userService.findBypersonnel_username(this.searchText).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (e) => console.error(e),
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
