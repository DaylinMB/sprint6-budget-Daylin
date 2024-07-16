import { Injectable } from '@angular/core';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private budgets: Budget[] = [
    { nombre: 'SEO', precio: 300 },
    { nombre: 'Publicidad', precio: 400 },
    { nombre: 'Página Web', precio: 500 }
  ];

  getBudgets(): Budget[] {
    return this.budgets;
  }
}
