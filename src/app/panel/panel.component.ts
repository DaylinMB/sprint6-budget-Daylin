/*panel.component.ts*/
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  @Input() showPanel: boolean = true;
  panelForm: FormGroup;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.panelForm = this.fb.group({
      pagines: new FormControl(this.budgetService.getBudgets().pagines),
      llenguatges: new FormControl(this.budgetService.getBudgets().llenguatges),
    });
  }

  ngOnInit(): void {
    this.panelForm.valueChanges.subscribe(values => {
      this.budgetService.updateBudget(values);
    });
  }

  increment(controlName: string) {
    const control = this.panelForm.get(controlName) as FormControl;
    control.setValue(control.value + 1);
    this.updateBudget();
  }

  decrement(controlName: string) {
    const control = this.panelForm.get(controlName) as FormControl;
    if (control.value > 1) {
      control.setValue(control.value - 1);
      this.updateBudget();
    }
  }
  
  updateBudget() {
    const updateValues = this.panelForm.value;
    this.budgetService.updateBudget(updateValues);
  }
}
