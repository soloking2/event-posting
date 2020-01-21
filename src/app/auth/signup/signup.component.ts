import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
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

export class SignupComponent {
  isLoading = false;

  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    if (form.invalid) {return; }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
  }
}
