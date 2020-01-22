import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    template: `
        <h1 mat-dialog-title>An error occurred</h1>
        <div mat-dialog-content>
        <p class="mat-body-1">{{data.message}}</p>
        </div>
        <div mat-dialog-actions>
            <button mat-button mat-dialog-close>Okay</button>
        </div>
    `
})

export class ErrorComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string} ) {}
}