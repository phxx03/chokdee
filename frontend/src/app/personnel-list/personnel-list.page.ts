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
  personnelList: any[] = [];
  searchText: string = '';
  defaultImage = ''; // เส้นทางไปยังรูปภาพตัวอย่าง
  
  sortOrder: 'asc' | 'desc' = 'asc';

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

  searchUser(): void {
    this.currentUser = {};
    this.currentIndex = -1;

    this.userService.findBypersonnel_username(this.searchText).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (e) => console.error(e),
    });
  }

  get filteredUsers() {
    const filtered = this.users?.filter((user) =>
      user.personnel_username?.toLowerCase().includes(this.searchText?.toLowerCase())
    );

    const sorted = filtered?.sort((a, b) => {
      if (this.sortOrder === 'asc' || this.sortOrder === 'desc') {
        if (this.sortOrder === 'asc') {
          if (typeof a.personnel_username === 'string' && typeof b.personnel_username === 'string') {
            return a.personnel_username.localeCompare(b.personnel_username);
          }
        } else if (this.sortOrder === 'desc') {
          if (typeof a.personnel_username === 'string' && typeof b.personnel_username === 'string') {
            return b.personnel_username.localeCompare(a.personnel_username);
          }
        }
      }
      return 0;
    });

    return sorted;
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
