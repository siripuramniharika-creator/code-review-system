import { Component ,signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { RouterLink ,Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-signup',
  imports: [MatButtonModule,MatCardModule,MatIconModule,MatInputModule,MatFormFieldModule,FormsModule,RouterLink,MatSelectModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  selected = '';
  signupMessage: string = '';
  constructor(private router: Router, private auth: Auth) {}
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
  email: string = '';
  password: string = '';
  contact: string = '';
  name: string = '';
  securityQuestion: string = '' ;
  securityAnswer: string = '';
  emailError = ''
  passwordError = '';
  contactError = '';
  nameError = '';
  securityQuestionError = '';   
  securityAnswerError = '';
  loading = false;
  signupSuccess = false;
  signup() {
    if (this.loading) return;
    console.log("SIGNUP CLICKED");
    // reset errors
    let isValid = true;
    this.emailError = '';
    this.passwordError = '';
    this.contactError = '';
    this.nameError = '';
    this.securityQuestionError = '';
    this.securityAnswerError = '';
    // empty name validation
    if (!this.name) {
      this.nameError = 'Full name is required';
      isValid = false;
    }
    // empty email validation
    if (!this.email || !this.email.includes('@')) {
      this.emailError = 'Please enter a valid email address';
      isValid = false;
    }
    // empty password validation
    if (this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters long';
      isValid = false;
    }   
    // empty contact validation 
    if (this.contact.length !== 10) {    
      this.contactError = 'Enter valid 10 digit number';
      isValid = false;
    }
    // empty security question validation 
    if (!this.securityQuestion) {
      this.securityQuestionError = 'Security question is required';
      isValid = false;
    }
    // empty security answer validation
    if (!this.securityAnswer) {
      this.securityAnswerError = 'Security answer is required';
      isValid = false;
    }
    if (!isValid) return;
    // stop if empty fields
  
    this.loading = true;

    const signupData = {
      fullname: this.name,
      email: this.email,
      password: this.password,
      contact: this.contact,
      security_question: this.securityQuestion,
      security_answer: this.securityAnswer
    };
    this.auth.signup(signupData)
      .subscribe({
          next: (response: any) => {
            this.loading = false;

            if (response?.message === 'User registered successfully') {
              this.signupMessage = 'Account created successfully!';
              this.loading = false;
              this.signupSuccess = true;

              setTimeout(() => {
                this.signupMessage = '';
                this.router.navigate(['/']);
              }, 2000);

            } else {

              alert(response?.message || 'Signup failed');
            }
          },

          error: (error) => {
            console.error('Signup error:', error);
            this.loading = false;

            alert('Unable to connect to server');
          }
        });
    }
}

