/*budget.service.ts*/
import { Injectable, signal } from '@angular/core';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private budgets = signal<Budget[]>([]);

  constructor() { }

  addBudget(budget: Budget) {
    this.budgets.update((budgets) => [...budgets, budget]);
  }

  getBudgets(): Budget[] {
    return this.budgets();
  }

  updateBudget(updatedBudget: Budget) {
    this.budgets.update((budgets) => {
      const index = budgets.findIndex(b => b.name === updatedBudget.name);
      if (index !== -1) {
        budgets[index] = updatedBudget;
      } else {
        console.error('Presupuesto no encontrado');
      }
      return budgets;
    });
  }
}
