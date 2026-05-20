import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  userProfile = {
    name: 'admin',
    email: 'admin@gmail.com',
    username: 'admin',
    memberSince: '2023-01-01',
  };
  reviews:any[] = [];
}
