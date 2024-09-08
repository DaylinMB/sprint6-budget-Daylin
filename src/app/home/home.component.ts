/**home.component.ts */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget.service';  // Asegúrate de que la ruta es correcta
import { CommonModule } from '@angular/common';
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
  private formValueChangesSubscription: any;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.budgetForm = this.fb.group({
      name: [''],
      phone: [''],
      email: [''],
      seo: [false],
      ads: [false],
      web: [false],
      pagines: [1], // Inicia en 0
      llenguatges: [1], // Inicia en 0
    });

    // Inicialmente suscribimos el valueChanges
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
    }

    // Sumar el costo de páginas y lenguajes, cada página y lenguaje añade 30 euros
    if (values.pagines && values.llenguatges) {
      this.total += values.pagines * values.llenguatges * 30;
    }

    console.log('Total actualizado:', this.total);
  }

  addBudget(event: Event) {
    event.preventDefault();
  
    if (this.budgetForm.valid) {
      const formValues = this.budgetForm.value;

      // Recalcular el total si falta
      const total = this.total;

      // Crear el objeto del presupuesto
      const budget = {
        ...formValues,
        total: total,  // Asegurarnos de incluir el total calculado
        pagines: formValues.pagines || 0,
        llenguatges: formValues.llenguatges || 0
      };

      // Añadir el presupuesto al servicio
      this.budgetService.addBudget(budget);
      console.log('Presupuesto añadido:', budget);

      // Desuscribimos temporalmente el valueChanges para evitar el reinicio del total a 0
      this.formValueChangesSubscription.unsubscribe();

      // Resetear el formulario sin perder los datos del total
      this.budgetForm.reset({
        seo: false,
        ads: false,
        web: false,
        pagines: 0,
        llenguatges: 0
      });

      // Volvemos a suscribir el valueChanges después del reset
      this.formValueChangesSubscription = this.budgetForm.valueChanges.subscribe((values) => {
        this.calcularTotal(values);
        for (let service of this.services) {
          this.showPanel[service.nombre] = values[service.nombre];
        }
      });

      // Restablecemos el total a 0 después del reset
      this.total = 0;

    } else {
      console.log('Formulario no válido');
    }
  }
  
  ngOnDestroy() {
    // Nos aseguramos de desuscribir cuando el componente se destruya
    if (this.formValueChangesSubscription) {
      this.formValueChangesSubscription.unsubscribe();
    }
  }

  trackByServiceName(index: number, service: any): string {
    return service.nombre;
  }

  isCardSelected(serviceName: string): boolean {
    return this.budgetForm.get(serviceName)!.value;
  }
}
