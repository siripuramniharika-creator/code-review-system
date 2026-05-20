import { Component,signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialog } from '../forgot-password-dialog/forgot-password-dialog';


@Component({
  selector: 'app-forgotpassword',
  imports: [MatButtonModule,MatCardModule,MatInputModule,MatIconModule,MatFormFieldModule,FormsModule,MatSelectModule,],
  templateUrl: './forgotpassword.html',
  styleUrl: './forgotpassword.css',
})
export class Forgotpassword {
  hide = signal(true);
  selected="option";
  email: string = '';              
  securityAnswer: string = '';
  
  constructor(private router: Router,private dialog: MatDialog) {}
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
  
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
  submitForgotPassword(email: string,  securityAnswer: string) {

    const correctEmail = "admin@gmail.com"; 
    const correctAnswer = "blue";
    const isValid =
      email === correctEmail &&
    securityAnswer.toLowerCase().trim() === correctAnswer;

    setTimeout(() => {

      if (isValid) {
        this.dialog.open(ForgotPasswordDialog, {
          width: '400px',
          data: {
            title: 'Success',
            message: 'Your password has been reset successfully.'
          }
        });
      } else {
        this.dialog.open(ForgotPasswordDialog, {
          width: '400px',
          data: {
            title: 'Error',
            message: 'Entered details are wrong. Please try again.'
          }
        });
      }

    }, 500);
  }
}
