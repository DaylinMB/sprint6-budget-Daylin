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
  filteredBudgets: Ilist[] = []; // Lista filtrada
  searchTerm: string = ''; // Término de búsqueda
  budgetService = inject(BudgetService);
  budgetForm: FormGroup;
  total: number = 0;
  services = [
    { nombre: 'seo', descripcion: 'SEO', precio: 300 },
    { nombre: 'ads', descripcion: 'ADS', precio: 400 },
    { nombre: 'web', descripcion: 'WEB', precio: 500 },
  ];
  activeButton: string | null = null; // Para rastrear el botón activo

  selectButton(button: string) {
    this.activeButton = button; // Cambia el botón activo
  }

  showPanel: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario
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
    const inputElement = event.target as HTMLInputElement; // Acceso seguro al checkbox
    if (inputElement && inputElement.checked !== null) {
      this.showPanel[serviceName] = inputElement.checked;
    }
  }

  addBudget() {
    if (this.budgetForm.valid) {
      const newBudget: Ilist = this.budgetForm.value;
      newBudget.total = this.calculateTotal(newBudget); // Calcular el total antes de agregar

      this.budgets.push(newBudget);
      this.filteredBudgets = this.budgets; // Actualiza la lista filtrada después de añadir
      this.budgetForm.reset({
        name: '',
        phone: '',
        email: '',
        seo: false,
        ads: false,
        web: false,
        pagines: 1, // Resetting to 1
        llenguatges: 1, // Resetting to 1
      });
    } else {
      console.error('Formulario no válido');
    }
  }

  calculateTotal(values: any): number {
    let total = 0;

    // Añadir el precio base de SEO y Ads
    if (values.seo) {
      total +=
        this.services.find((service) => service.nombre === 'seo')?.precio || 0;
    }

    if (values.ads) {
      total +=
        this.services.find((service) => service.nombre === 'ads')?.precio || 0;
    }

    // Valores por defecto si no están definidos
    const paginas = values.pagines || 1;
    const lenguajes = values.llenguatges || 1;

    // Añadir el precio base del servicio Web y luego el coste adicional por páginas e idiomas
    if (values.web) {
      total +=
        this.services.find((service) => service.nombre === 'web')?.precio || 0; // Precio base del servicio Web
      total += paginas * lenguajes * 30; // Coste adicional por páginas e idiomas
    }

    return total;
  }

  ngOnInit() {
    this.filteredBudgets = this.budgets; // Inicializa la lista filtrada con todos los presupuestos
    this.budgetForm.valueChanges.subscribe((values) => {
      this.total = this.calculateTotal(values);
    });
  }



  searchBudgets() {
    // Evitar comportamiento por defecto si se presiona Enter
    event?.preventDefault(); 
  
    const term = this.searchTerm.toLowerCase();
  
    // Filtrar los presupuestos que coincidan con el término de búsqueda
    this.filteredBudgets = this.budgets.filter((budget) =>
      budget.name.toLowerCase().includes(term) || // Busca en el nombre
      budget.date.toISOString().includes(term)    // Busca en la fecha
    );
  
    // Si hay coincidencias, mover los presupuestos coincidentes al principio
    if (term) {
      const matchingBudgets = this.filteredBudgets; // Ya tenemos los que coinciden
      const nonMatchingBudgets = this.budgets.filter(
        (budget) => !(
          budget.name.toLowerCase().includes(term) ||
          budget.date.toISOString().includes(term)
        )
      );
  
      // Combinar coincidentes al inicio y no coincidentes al final
      this.filteredBudgets = [...matchingBudgets, ...nonMatchingBudgets];
    } else {
      // Si no hay término de búsqueda, mostrar todos los presupuestos
      this.filteredBudgets = [...this.budgets];
    }
  }
  


sortByDate() {
  this.selectButton('date'); // Activa el botón de "Data"
  
  // Lógica de ordenación
  this.filteredBudgets.sort((a, b) => b.date.getTime() - a.date.getTime());
}

sortByPrice() {
  this.selectButton('price'); // Activa el botón de "Import"

  // Lógica de ordenación
  this.filteredBudgets.sort((a, b) => (b.total ?? 0) - (a.total ?? 0));
}

sortByName() {
  this.selectButton('name'); // Activa el botón de "Nom"

  // Lógica de ordenación
  this.filteredBudgets.sort((a, b) => a.name.localeCompare(b.name));
}





  isCardSelected(serviceName: string): boolean {
    return this.budgetForm.get(serviceName)!.value;
  }
}
