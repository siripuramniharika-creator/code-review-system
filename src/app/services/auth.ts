import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'http://127.0.0.1:8000/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  signup(data: any) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  forgotPassword(data: any) {
    return this.http.post(`${this.apiUrl}/forgot-password`, data);
  }
  getUserByEmail(email: string) {
    return this.http.get(`http://localhost:8000/auth/user/${email}`);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getTokenExpiry(): number | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    return decoded.exp ? decoded.exp * 1000 : null; // convert to ms
  }

  isTokenExpired(): boolean {
    const expiry = this.getTokenExpiry();
    if (!expiry) return true;

    return Date.now() > expiry;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/']);
  }
  canActivate(): boolean {
    if (this.isTokenExpired()) {
      this.logout();
      return false;
    }
    return true;
  }
}
