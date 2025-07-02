import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { filter, Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
  // encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  isMobile = false;
  isloggedUser = false;
  private loginSub!: Subscription;
  constructor(private authService: AuthService) {
    this.loginSub = this.authService.loggedIn$.subscribe(status => {
      this.isloggedUser = status;
    });
  }
  ngOnInit(): void {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile.bind(this));
  }

  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  closeSidebar() {
    this.isCollapsed = true;
  }

  handleSidebarCollapse(value: boolean) {
    console.log(value)
    this.isCollapsed = value;
  }
  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }
}

