import { Component } from '@angular/core';
import { Constants } from './models/constants/constants';

export function tokenGetter(): string {
  let constants = new Constants;
  return localStorage.getItem(constants.ACCESS_TOKEN);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Store';
}
