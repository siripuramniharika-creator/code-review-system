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
  login() {
    if (this.email === 'admin@gmail.com' && this.password === '123456') {
     this.loading = true;  
      this.cdr.detectChanges(); 
      setTimeout(() => { 
            
        this.router.navigate(['/utils']);
      }, 5000);
    } 
    else {
      alert("Invalid email or password");
    }
  }
}
