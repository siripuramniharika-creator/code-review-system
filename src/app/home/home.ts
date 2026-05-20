import { ChangeDetectionStrategy, ChangeDetectorRef, Component , signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterLink ,Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule, RouterLink,CommonModule,FormsModule, MatProgressSpinnerModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  loading: boolean = false;
   hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  constructor(private router:Router, private cdr: ChangeDetectorRef){}
  email: string = '';
  password: string = '';
  emailError = '';
  passwordError = '';
  loginError = '';
  login() {

    // reset errors
    this.emailError = '';
    this.passwordError = '';
    this.loginError = '';

    // empty email validation
    if (!this.email) {
      this.emailError = 'Email is required';
    }

    // empty password validation
    if (!this.password) {
      this.passwordError = 'Password is required';
    }

    // stop if empty fields
    if (this.emailError || this.passwordError) {
      return;
    }

    // invalid credentials
    if (
      this.email !== 'admin@gmail.com' ||
      this.password !== '123456'
    ) {

      this.loginError = 'Invalid email or password';
      return;
    }

    // SUCCESS LOGIN
    this.loading = true;

    setTimeout(() => {

      this.router.navigate(['/utils']);

    }, 4000);
  }
}
