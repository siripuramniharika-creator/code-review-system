import { Component,signal, ChangeDetectorRef } from '@angular/core';
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
import { Auth } from '../services/auth';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-forgotpassword',
  imports: [MatButtonModule,MatCardModule,MatInputModule,MatIconModule,MatFormFieldModule,FormsModule,MatSelectModule,MatProgressSpinnerModule,CommonModule],
  templateUrl: './forgotpassword.html',
  styleUrl: './forgotpassword.css',
})
export class Forgotpassword {
  hide = signal(true);
  selected="Select";
  email: string = '';              
  securityAnswer: string = '';
  newPassword: string = '';
  loading = false;
  
  constructor(private router: Router,private dialog: MatDialog,private auth: Auth, private cdr: ChangeDetectorRef) {}
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
  submitForgotPassword() {
    console.log('Submit clicked');
    if (this.loading) return;
    this.loading = true;
    const payload = {
      email: this.email,
      security_question: this.selected,
      security_answer: this.securityAnswer,
      new_password: this.newPassword
    };
    this.auth.forgotPassword(payload).subscribe({
      next: (response: any) => {
          console.log('SUCCESS', response);
        setTimeout(() => {
          this.loading = false;
          this.cdr.detectChanges();
          const dialogRef = this.dialog.open(ForgotPasswordDialog, {
            width: '500px',
            height: '200px',
            data: {
              title: 'Success',
              message: response?.message || 'Password updated successfully.'
            }
          });
          dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/']);
          });
        }, 2000); // Show success dialog after 2 seconds
      },

      error: (err) => {
        setTimeout(() => {
          console.log('ERROR RECEIVED');
          this.loading = false;
          this.cdr.detectChanges();
          const dialogRef = this.dialog.open(ForgotPasswordDialog, {
            width: '500px',
            height: '200px',
            data: {
              title: 'Error',
              message: err.error?.detail || 'An error occurred while updating the password.'
            }
          });
          dialogRef.afterClosed().subscribe();

        }, 2000);
      } 
    });
  }
}
