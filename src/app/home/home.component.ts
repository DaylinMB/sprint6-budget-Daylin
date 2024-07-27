/**home.component.ts */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';
import { Budget } from '../models/budget';
import { WelcomeComponent } from '../welcome/welcome.component';
import { PanelComponent } from '../panel/panel.component';
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PanelComponent, BudgetsListComponent, WelcomeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  budgetForm: FormGroup;
  services = [
    { nombre: 'seo', descripcion: 'Seo', precio: 300 },
    { nombre: 'ads', descripcion: 'Ads', precio: 400 },
    { nombre: 'web', descripcion: 'Web', precio: 500 },
  ];
  total = 0;
  showPanel: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.budgetForm = this.fb.group({
      name: [''],
      phone: [''],
      email: [''],
      seo: [false],
      ads: [false],
      web: [false],
    });

    this.budgetForm.valueChanges.subscribe((values) => {
      this.calcularTotal(values);
      for (let service of this.services) {
        this.showPanel[service.nombre] = values[service.nombre];
      }
    });
  }

  ngOnInit() {}

  calcularTotal(values: any) {
    this.total = 0;
    if (values.seo) {
      this.total += this.services.find((s) => s.nombre === 'seo')!.precio;
    }
    if (values.ads) {
      this.total += this.services.find((s) => s.nombre === 'ads')!.precio;
    }
    if (values.web) {
      this.total += this.services.find((s) => s.nombre === 'web')!.precio;
    }
  }

  addBudget() {
    const budget: Budget = {
      ...this.budgetForm.value,
      total: this.total
    };
    this.budgetService.addBudget(budget);
  }

  trackByServiceName(index: number, service: any): string {
    return service.nombre;
  }

  isCardSelected(serviceName: string): boolean {
    return this.budgetForm.get(serviceName)!.value;
  }
}
