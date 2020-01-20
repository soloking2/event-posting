import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  onLogin(form: NgForm) {
    console.log(form.value);
  }
}
