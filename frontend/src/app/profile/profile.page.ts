import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentUser: any;
  users?: user[];
  personnel_username?: string;
  defaultImage = 'assets/timered.png'; // เส้นทางไปยังรูปภาพตัวอย่าง
  sortOrder: 'asc' | 'desc' = 'asc';
  searchText: string = '';

  constructor(
    private token: TokenStorageService,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const user = this.token.getUser();
    this.currentUser = this.token.getUser();
    this.personnel_username = user.personnel_username;
    // this.getUser(this.route.snapshot.params['id']);
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe(
        (data) => {
          this.currentUser = data;
          console.log(data);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getSafeImageURL(image: string | undefined): SafeUrl {
    if (image) {
      return this.sanitizer.bypassSecurityTrustUrl('http://localhost:8080/uploads/' + image);
    }
    return this.defaultImage;
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
}
