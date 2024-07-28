/**budgets-list.component.ts */
import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para usar ngModel
import { BudgetService } from '../services/budget.service';
import { Budget } from '../models/budget';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.scss']
})
export class BudgetsListComponent {
  budgets: Budget[] = [];
  searchTerm: string = '';

  constructor(private budgetService: BudgetService) {
    this.budgets = this.budgetService.getBudgets();
  }

  sortByDate(): void {
    this.budgets.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  sortByPrice(): void {
    this.budgets.sort((a, b) => a.total - b.total);
  }

  sortByName(): void {
    this.budgets.sort((a, b) => a.name.localeCompare(b.name));
  }

  searchBudget(): void {
    this.budgets = this.budgetService.getBudgets().filter(budget =>
      budget.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
