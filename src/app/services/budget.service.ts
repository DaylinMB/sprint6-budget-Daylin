// budget.service.ts
import { Injectable, signal } from '@angular/core';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private budgets = signal<Budget[]>([]);

  constructor() { }

  addBudget(budget: Budget) {
    budget.total = this.calculateTotal(budget);
    budget.date = new Date(); 
    this.budgets.update((budgets) => [...budgets, budget]);
  }

  getBudgets(): Budget[] {
    return this.budgets();
  }

  calculateTotal(budget: Budget): number {
    let total = 0;
    if (budget.seo) total += 300;
    if (budget.ads) total += 400;
    if (budget.web) {
      total += 500;
      total += budget.pagines * budget.llenguatges * 30;
    }
    return total;
  }
}