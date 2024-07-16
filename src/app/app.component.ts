import { Component } from '@angular/core';
import { BudgetsListComponent } from './budgets-list/budgets-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BudgetsListComponent],
  template: `<app-budgets-list></app-budgets-list>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sprint6-budget-Daylin';
}