/*app.component.ts*/
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomeComponent],
  template: `<app-home></app-home>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sprint6-budget-Daylin';
}
