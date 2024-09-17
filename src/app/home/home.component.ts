// home.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../panel/panel.component';
import { Budget } from '../models/budget';
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';
import { WelcomeComponent } from "../welcome/welcome.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PanelComponent, BudgetsListComponent, WelcomeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {
  budgetForm: FormGroup;
  services = [
    { nombre: 'seo', descripcion: 'SEO', precio: 300 },
    { nombre: 'ads', descripcion: 'ADS', precio: 400 },
    { nombre: 'web', descripcion: 'Web', precio: 500 },
  ];

  total = 0;
  showPanel: { [key: string]: boolean } = {};
  private formValueChangesSubscription: any;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.budgetForm = this.fb.group({
      name: [''],
      phone: [''],
      email: [''],
      seo: [false],
      ads: [false],
      web: [false],
      pagines: [1],
      llenguatges: [1],
    });
  }

  ngOnInit(): void {
    this.formValueChangesSubscription = this.budgetForm.valueChanges.subscribe((values) => {
      this.calcularTotal(values);
      for (let service of this.services) {
        this.showPanel[service.nombre] = values[service.nombre];
      }
    });
  }

  calcularTotal(values: any) {
    this.total = 0;

    // Sumar precios de los servicios seleccionados
    if (values.seo) {
      this.total += this.services.find((s) => s.nombre === 'seo')!.precio;
    }
    if (values.ads) {
      this.total += this.services.find((s) => s.nombre === 'ads')!.precio;
    }
    if (values.web) {
      this.total += this.services.find((s) => s.nombre === 'web')!.precio;
      // Sumar el costo de páginas y lenguajes si web está seleccionado
      if (values.pagines && values.llenguatges) {
        this.total += values.pagines * values.llenguatges * 30;
      }
    }
  }

  addBudget(event: Event) {
    event.preventDefault();
  
    // Recalcular el total antes de crear el nuevo presupuesto
    const formValues = this.budgetForm.value;
    this.calcularTotal(formValues);  // Asegúrate de que el total esté actualizado
  
    if (this.budgetForm.valid) {
      const newBudget: Budget = {
        name: formValues.name,
        phone: formValues.phone,
        email: formValues.email,
        seo: formValues.seo,
        ads: formValues.ads,
        web: formValues.web,
        pagines: formValues.pagines || 0,
        llenguatges: formValues.llenguatges || 0,
        total: this.total,
        date: new Date(),
      };
  
      this.budgetService.addBudget(newBudget);
  
      // Resetear el formulario
      this.resetForm();
    }
  }
  

  resetForm() {
    this.formValueChangesSubscription.unsubscribe();
    this.budgetForm.reset({
      name: '',
      phone: '',
      email: '',
      seo: false,
      ads: false,
      web: false,
      pagines: 1,
      llenguatges: 1
    });
    this.formValueChangesSubscription = this.budgetForm.valueChanges.subscribe((values) => {
      this.calcularTotal(values);
      for (let service of this.services) {
        this.showPanel[service.nombre] = values[service.nombre];
      }
    });
    this.total = 0;
  }

  ngOnDestroy() {
    if (this.formValueChangesSubscription) {
      this.formValueChangesSubscription.unsubscribe();
    }
  }

  isCardSelected(serviceName: string): boolean {
    return this.budgetForm.get(serviceName)!.value;
  }

  trackByService(index: number, service: any): string {
    return service.nombre;
  }
}
