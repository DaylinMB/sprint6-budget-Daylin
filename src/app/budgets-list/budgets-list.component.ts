// budgets-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { PanelComponent } from '../panel/panel.component';
import { CommonModule } from '@angular/common';
import { Ilist } from '../models/budget';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PanelComponent,
    HomeComponent,
  ],
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.scss'],
})
export class BudgetsListComponent implements OnInit {
 
  budgets: Ilist[] = [];
  filteredBudgets: Ilist[] = [];
  searchTerm: string = ''; 
  budgetService = inject(BudgetService);
  budgetForm: FormGroup;
  total: number = 0;
  services = [
    { nombre: 'seo', descripcion: 'SEO', precio: 300 },
    { nombre: 'ads', descripcion: 'ADS', precio: 400 },
    { nombre: 'web', descripcion: 'WEB', precio: 500 },
  ];
  activeButton: string | null = null; 

  selectButton(button: string) {
    this.activeButton = button; 
  }

  showPanel: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder) {
    this.budgetForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      seo: [false],
      ads: [false],
      web: [false],
      pagines: [1],
      llenguatges: [1],
    });
  }

  togglePanel(serviceName: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement; 
    if (inputElement && inputElement.checked !== null) {
      this.showPanel[serviceName] = inputElement.checked;
    }
  }

  addBudget() {
    if (this.budgetForm.valid) {
      const newBudget: Ilist = this.budgetForm.value;
      newBudget.total = this.calculateTotal(newBudget); 

      this.budgets.push(newBudget);
      this.filteredBudgets = this.budgets;
      this.budgetForm.reset({
        name: '',
        phone: '',
        email: '',
        seo: false,
        ads: false,
        web: false,
        pagines: 1, 
        llenguatges: 1,
      });
    } else {
      console.error('Formulario no válido');
    }
  }

  calculateTotal(values: any): number {
    let total = 0;

    if (values.seo) {
      total +=
        this.services.find((service) => service.nombre === 'seo')?.precio || 0;
    }

    if (values.ads) {
      total +=
        this.services.find((service) => service.nombre === 'ads')?.precio || 0;
    }

    const paginas = values.pagines || 1;
    const lenguajes = values.llenguatges || 1;


    if (values.web) {
      total +=
        this.services.find((service) => service.nombre === 'web')?.precio || 0; 
      total += paginas * lenguajes * 30; 
    }

    return total;
  }

  ngOnInit() {
    this.filteredBudgets = this.budgets;
    this.budgetForm.valueChanges.subscribe((values) => {
      this.total = this.calculateTotal(values);
    });
  }
 
  sortByDate() {
    this.selectButton('date');
    this.filteredBudgets.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  sortByPrice() {
    this.selectButton('price'); 
    this.filteredBudgets.sort((a, b) => (b.total ?? 0) - (a.total ?? 0));
  }

  sortByName() {
    this.selectButton('name'); 
    this.filteredBudgets.sort((a, b) => a.name.localeCompare(b.name));
  }

  isCardSelected(serviceName: string): boolean {
    return this.budgetForm.get(serviceName)!.value;
  }
}
