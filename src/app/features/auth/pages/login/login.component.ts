import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

interface CountryOption {
  name: string;
  code: string;
}

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoggedUser = false;
  countries: CountryOption[] = [];
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) { 
    this.initForm();
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    
    this.loadCountries();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      country: [null, Validators.required],
      language: [null, Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private loadCountries(): void {
    this.http.get<CountryOption[]>('data/country-select-options.json')
      .subscribe({
        next: (data) => this.countries = data,
        error: (err) => console.error('Failed to load country data', err)
      });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(this.loginForm.value);
  }
}