import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('code-review-system');
  private timeout: any;
  private intervalId: any;
  constructor(private auth: Auth) {}

  ngOnInit() {
    this.startAutoLogout();
  }

  startAutoLogout() {
    const expiry = this.auth.getTokenExpiry();

    if (!expiry) return;

    const timeLeft = expiry - Date.now();
    if (timeLeft <= 0) {
      this.auth.logout();
      return;
    }

    // ✅ 1. exact logout at expiry time
    this.timeout = setTimeout(() => {
      this.auth.logout();
    }, timeLeft);

    // ✅ 2. safety check every 1 minute
    this.intervalId = setInterval(() => {
      if (this.auth.isTokenExpired()) {
        this.auth.logout();
      }
    }, 60000);
  }

  ngOnDestroy() {
    if (this.timeout) clearTimeout(this.timeout);
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
