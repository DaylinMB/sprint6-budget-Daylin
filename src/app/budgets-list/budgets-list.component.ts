// budgets-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, FormBuilder, FormGroup,  Validators} from '@angular/forms';
import { Budget } from '../models/budget';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.scss'],
})
export class BudgetsListComponent {
  budgetForm: FormGroup;
  budgets: any[] = []; // Array para almacenar presupuestos

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario con los campos necesarios
    this.budgetForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Método para agregar un presupuesto
  addBudget() {
    if (this.budgetForm.valid) {
      const newBudget = this.budgetForm.value;
      newBudget.date = new Date(); // Añadir fecha actual al presupuesto
      newBudget.total = this.calculateTotal(newBudget); // Método para calcular el total del presupuesto
      this.budgets.push(newBudget);
      this.budgetForm.reset(); // Reiniciar el formulario después de agregar el presupuesto
    }

  }

  // Métodos para ordenar presupuestos
  sortByDate() {
    this.budgets.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  sortByPrice() {
    this.budgets.sort((a, b) => b.total - a.total);
  }

  sortByName() {
    this.budgets.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Método para calcular el total del presupuesto
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
