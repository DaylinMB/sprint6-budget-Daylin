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

    // Añadir los precios base de SEO y Ads
    if (budget.seo) total += 300;
    if (budget.ads) total += 400;

    // Valores por defecto si no están definidos
    const pagines = budget.pagines || 1;
    const llenguatges = budget.llenguatges || 1;

    // Añadir el precio base del servicio Web y luego el coste adicional por páginas e idiomas
    if (budget.web) {
      total += 500; // Precio base del servicio Web
      total += pagines * llenguatges * 30; // Coste adicional por páginas e idiomas
    }

    return total;
  }
}
