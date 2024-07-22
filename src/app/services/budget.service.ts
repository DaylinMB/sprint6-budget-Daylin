/*budget.service.ts*/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private budget: Budget = {
    seo: false,
    ads: false,
    web: false,
    pagines: 1,
    llenguatges: 1,
    total: 0,
  };

  private budgetSubject = new BehaviorSubject<Budget>(this.budget);

  calculateTotal(): number {
    let total = 0;
    if (this.budget.seo) {
      total += 300 + (this.budget.pagines * this.budget.llenguatges * 30);
    }
    if (this.budget.ads) {
      total += 400 + (this.budget.pagines * this.budget.llenguatges * 30);
    }
    if (this.budget.web) {
      total += 500 + (this.budget.pagines * this.budget.llenguatges * 30);
    }
    this.budget.total = total;
    return total; 
  }

  updateBudget(budget: Partial<Budget>): void {
    this.budget = { ...this.budget, ...budget };
    this.calculateTotal();
    this.budgetSubject.next(this.budget);
  }

  getBudgets(): Budget {
    return this.budget;
  }

  getBudgetsObservable() {
    return this.budgetSubject.asObservable();
  }
}