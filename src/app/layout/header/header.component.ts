import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() isCollapsed = false;
  @Output() toggle = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {
  }

  navigateToCustomerComplaint() {
    localStorage.setItem('isShowGrid', 'true')
    this.router.navigate(['/customer-complaint-management']);
  }

  onToggle() {
    this.toggle.emit();
  }

  logout(): void {
    this.authService.logout();
  }

}