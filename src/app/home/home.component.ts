import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from "../panel/panel.component";
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PanelComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

    this.presupuestoForm.valueChanges.subscribe(values => {
      this.budgetService.updateBudget(values);
      this.calcularTotal(values);
      for (let servicio of this.servicios) {
        this.showPanel[servicio.nombre] = values[servicio.nombre];
      }
    });
  }

  ngOnInit() {
    this.budgetService.getBudgetsObservable().subscribe(budget => {
      this.presupuestoForm.patchValue({
        seo: budget.seo,
        ads: budget.ads,
        web: budget.web,
      });
      this.calcularTotal(this.presupuestoForm.value);
    });
  }

  calcularTotal(values: any) {
    this.total = 0;
    const budget = this.budgetService.getBudgets();
    if (values.seo) {
      this.total += this.servicios.find(s => s.nombre === 'seo')!.precio;
      this.total += budget.pagines * budget.llenguatges * 30;
    }
    if (values.ads) {
      this.total += this.servicios.find(s => s.nombre === 'ads')!.precio;
      this.total += budget.pagines * budget.llenguatges * 30;
    }
    if (values.web) {
      this.total += this.servicios.find(s => s.nombre === 'web')!.precio;
      this.total += budget.pagines * budget.llenguatges * 30;
    }
  }

  isCardSelected(serviceName: string): boolean {
    return this.presupuestoForm.get(serviceName)?.value;
  }
}
