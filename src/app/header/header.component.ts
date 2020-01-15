import { Component } from '@angular/core';

@Component({
  selector: 'mc-header',
  templateUrl: './header.component.html',
  styles: [
    `
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    a {text-decoration: none; color: black}
    .spacer {
      flex: 1 1 auto;
    }
    `
  ]
})

export class HeaderComponent {}
