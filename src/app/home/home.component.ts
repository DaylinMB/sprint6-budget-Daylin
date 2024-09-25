// home.component.ts´
import { WelcomeComponent } from '../welcome/welcome.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../panel/panel.component';
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, WelcomeComponent, PanelComponent, BudgetsListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {

}