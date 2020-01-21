import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styles: [
    `
    mat-form-field {
      width: 100%;
    }
    mat-spinner {
      margin: auto;
    }
    `
  ]
})

export class LoginComponent {
  isLoading = false;

  constructor(public authService: AuthService) {}

  onLogin(form: NgForm) {
    if (form.invalid) { return; }
    this.authService.loginUser(form.value.email, form.value.password);
  }
}
