//budget.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { BudgetService } from './budget.service';
import { Budget } from '../models/budget';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetService],
    });
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate total budget correctly when adding a budget', () => {
    const testBudget: Budget = {
      name: 'Test Budget',
      phone: '123456789',
      email: 'test@example.com',
      seo: true,
      ads: true,
      web: true,
      pagines: 3,
      llenguatges: 2,
      total: 0,
      date: new Date(),
    };

    service.addBudget(testBudget); // Usar addBudget para calcular el total

    const budgets = service.getBudgets(); // Verificar el array de presupuestos
    const addedBudget = budgets.find(b => b.name === 'Test Budget');
    expect(addedBudget).toBeTruthy();
    expect(addedBudget!.total).toBe(1340);  // Esperado: 300 + 400 + 500 + (3 * 2 * 30)
  });
});
