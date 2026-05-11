import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Dashboard } from '../dashboard/dashboard';
import { History } from '../history/history';
import { Profile } from '../profile/profile';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-utils',
  imports: [MatCardModule,MatIconModule,Dashboard,History,Profile,CommonModule],
  templateUrl: './utils.html',
  styleUrl: './utils.css',
})
export class Utils {
  selectedPage = 'dashboard';
}
