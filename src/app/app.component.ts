import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FlashCard';
  setting;

  routeChange(event) {
    this.setting = event;
    console.log(event);
  }
}
