import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentUser: any;
  personnel_username?: string;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    const user = this.token.getUser();
    this.currentUser = this.token.getUser();
    this.personnel_username = user.personnel_username;
  }
}