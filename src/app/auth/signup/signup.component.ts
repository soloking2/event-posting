import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  onLogin(form: NgForm) {
    console.log(form.value);
  }
}
