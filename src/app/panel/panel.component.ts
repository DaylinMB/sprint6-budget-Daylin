// panel.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  @Input() panelForm!: FormGroup; // Definir panelForm como un @Input

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Código de inicialización si es necesario
  }

  increment(field: string): void {
    const currentValue = this.panelForm.get(field)?.value || 0;
    this.panelForm.get(field)?.setValue(currentValue + 1);
  }

  decrement(field: string): void {
    const currentValue = this.panelForm.get(field)?.value || 0;
    if (currentValue > 1) {
      this.panelForm.get(field)?.setValue(currentValue - 1);
    }
  }
}
