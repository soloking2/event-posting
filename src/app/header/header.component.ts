import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mc-header',
  templateUrl: './header.component.html',
  styles: [
    `
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
    }
    a {text-decoration: none; color: black}
    .spacer {
      flex: 1 1 auto;
    }
    `
  ]
})

export class HeaderComponent implements OnInit, OnDestroy{
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout() {
    this.authService.logoutUser();
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
