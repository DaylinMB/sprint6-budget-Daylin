// budget.service.ts
import { Injectable } from '@angular/core';
import { Ilist } from '../models/budget';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  budgets: Ilist[] = [];

  addBudget(budget: Ilist): void {
    const total = this.calculateTotal(budget);
    budget.total = total;
    this.budgets.push(budget);
  }

  fetchBudgets(): Ilist[] {
    return this.budgets;
  }

  calculateTotal(budget: Ilist): number {
    let total = 0;

    if (budget.seo) total += 300;
    if (budget.ads) total += 400;

    const pagines = budget.pagines || 1;
    const llenguatges = budget.llenguatges || 1;

    if (budget.web) {
      total += 500; 
      total += pagines * llenguatges * 30; 
    }

    return total;
  }
}
