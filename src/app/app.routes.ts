/**app.routes.ts */
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BudgetsListComponent } from './budgets-list/budgets-list.component'; 

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: BudgetsListComponent },
  { path: 'home', component: HomeComponent },
];
