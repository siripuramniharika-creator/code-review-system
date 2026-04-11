import { Component,signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { Router } from "@angular/router";

@Component({
  selector: 'app-forgotpassword',
  imports: [MatButtonModule,MatCardModule,MatInputModule,MatIconModule,MatFormFieldModule,FormsModule,MatSelectModule],
  templateUrl: './forgotpassword.html',
  styleUrl: './forgotpassword.css',
})
export class Forgotpassword {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  selected="option";
  constructor(private router: Router) {}
  handleAction(action: string) {
    if (action === 'close') {
      const confirmClose = confirm("Are you sure you want to close? Your entered details will be lost.");
      if (confirmClose) {
        this.router.navigate(['/']);
      }
    } 
    else if (action === 'back') {
      const confirmBack = confirm("Are you sure you want to go back? Any unsaved information will be lost.");
      if (confirmBack) {
        this.router.navigate(['/']);
      }
    }
  }
}
