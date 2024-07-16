import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budgets-list',
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.scss'], 
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})

export class BudgetsListComponent {
  presupuestoForm: FormGroup;
  total: number = 0;

  servicios = [
    { nombre: 'seo', descripcion: 'Seo', precio: 300 },
    { nombre: 'publicidad', descripcion: 'Ads', precio: 400 },
    { nombre: 'web', descripcion: 'Web', precio: 500 }
  ];

  constructor(private fb: FormBuilder) {
    this.presupuestoForm = this.fb.group({
      seo: [false],
      publicidad: [false],
      web: [false]
    });

    this.presupuestoForm.valueChanges.subscribe(values => {
      this.calcularTotal(values);
    });
  }

  calcularTotal(values: any) {
    this.total = 0;
    if (values.seo) this.total += this.servicios.find(s => s.nombre === 'seo')!.precio;
    if (values.publicidad) this.total += this.servicios.find(s => s.nombre === 'publicidad')!.precio;
    if (values.web) this.total += this.servicios.find(s => s.nombre === 'web')!.precio;
  }
}