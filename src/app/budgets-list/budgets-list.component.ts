/* budgets-list.component.ts */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from "../panel/panel.component";
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PanelComponent],
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.scss']
})
export class BudgetsListComponent implements OnInit {
  presupuestoForm: FormGroup;
  total: number = 0;
  showPanel: { [key: string]: boolean } = {};

  servicios = [
    { nombre: 'seo', descripcion: 'Seo', precio: 300 },
    { nombre: 'ads', descripcion: 'Ads', precio: 400 },
    { nombre: 'web', descripcion: 'Web', precio: 500 }
  ];

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.presupuestoForm = this.fb.group({
      seo: [false],
      ads: [false],
      web: [false],
    });
  }

  ngOnInit(): void {
    this.presupuestoForm.valueChanges.subscribe(values => {
      this.budgetService.updateBudget(values);
      this.calcularTotal();
      for (let servicio of this.servicios) {
        this.showPanel[servicio.nombre] = values[servicio.nombre];
      }
    });

    this.budgetService.getBudgetsObservable().subscribe(budget => {
      this.total = this.budgetService.calculateTotal();
    });
  }

  calcularTotal() {
    this.total = this.budgetService.calculateTotal();
  }

  isCardSelected(serviceName: string): boolean {
    return this.presupuestoForm.get(serviceName)?.value;
  }
  
}