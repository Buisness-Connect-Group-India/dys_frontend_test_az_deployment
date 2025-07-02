import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { NzMessageService } from 'ng-zorro-antd/message';

interface LoginPayload {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly LOGIN_KEY = 'isLoginStatus';
  private loggedInSubject = new BehaviorSubject<boolean>(this.getStoredLoginStatus());
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private router: Router, private http: HttpClient, private messageService: NzMessageService) { }

  private getStoredLoginStatus(): boolean {
    return localStorage.getItem(this.LOGIN_KEY) === 'true';
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  login(loginData: any): void {
    const payload = {
      username: loginData.username,
      password: loginData.password,
    };

    const loginCreateUrl = API_ENDPOINTS['LOGIN'].create;

    if (!loginCreateUrl) {
      return;
    }

    this.http.post(loginCreateUrl, payload).subscribe({
      next: (res: any) => {
        if (res.status === 'SUCCESS') {
          localStorage.setItem('token', res.payload.token);
          localStorage.setItem('country', loginData.country);
          localStorage.setItem('language', loginData.language);
          localStorage.setItem(this.LOGIN_KEY, 'true');
          this.loggedInSubject.next(true);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        localStorage.setItem(this.LOGIN_KEY, 'false');
        this.loggedInSubject.next(false);
        this.messageService.create('error', 'Invalid Username Or Password')
      }
    })

  }

  logout(): void {
    localStorage.removeItem(this.LOGIN_KEY);
    this.loggedInSubject.next(false);
    this.router.navigate(['']);
  }
}