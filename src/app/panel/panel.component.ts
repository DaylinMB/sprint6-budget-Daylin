/*panel.component.ts*/
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class PanelComponent implements OnInit, OnChanges {
  @Input() showPanel: boolean = true; // Verificar que esté correctamente tipado
  panelForm: FormGroup;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.panelForm = this.fb.group({
      pagines: new FormControl(1),
      llenguatges: new FormControl(1),
    });
  }

  ngOnInit(): void {
    this.panelForm.valueChanges.subscribe(values => {
      this.budgetService.updateBudget(values);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showPanel'] && changes['showPanel'].currentValue === true) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.panelForm.reset({
      pagines: 1,
      llenguatges: 1
    });
  }

  increment(controlName: string) {
    const control = this.panelForm.get(controlName) as FormControl;
    control.setValue(control.value + 1);
  }

  decrement(controlName: string) {
    const control = this.panelForm.get(controlName) as FormControl;
    if (control.value > 1) {
      control.setValue(control.value - 1);
    }
  }
}
