/*budget.service.ts*/
import { Injectable, signal } from '@angular/core';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private budgets = signal<Budget[]>([]);

  constructor() { }

  // Añadir un nuevo presupuesto al array
  addBudget(budget: Budget) {
    budget.total = this.calculateTotal(budget);
    this.budgets.update((budgets) => [...budgets, budget]);
  }

  // Obtener todos los presupuestos
  getBudgets(): Budget[] {
    return this.budgets();
  }

  // Método para actualizar un presupuesto existente
  updateBudget(updatedBudget: Budget) {
    this.budgets.update((budgets) => {
      const index = budgets.findIndex(b => b.name === updatedBudget.name);
      if (index !== -1) {
        updatedBudget.total = this.calculateTotal(updatedBudget);
        budgets[index] = updatedBudget;
      }
      return budgets;
    });
  }
  public calculateTotal(budget: Budget): number {
    let total = 0;
    if (budget.seo) total += 300;
    if (budget.ads) total += 400;
    if (budget.web) total += 500;
    total += budget.pagines * budget.llenguatges * 30; // Calcula el total basándote en pagines y llenguatges
    return total;
  }
  
}










/**
 * 
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


 */



























































/**
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

 */