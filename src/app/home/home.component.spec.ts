import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


/*
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { BudgetService } from '../services/budget.service';
import { PanelComponent } from '../panel/panel.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let budgetService: BudgetService;

  beforeEach(async () => {
    const budgetServiceStub = {
      getBudgets: () => ({ pagines: 3, llenguatges: 2 }),
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [ReactiveFormsModule, PanelComponent],
      providers: [{ provide: BudgetService, useValue: budgetServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    budgetService = TestBed.inject(BudgetService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with false values', () => {
    const formValues = component.presupuestoForm.value;
    expect(formValues.seo).toBeFalse();
    expect(formValues.ads).toBeFalse();
    expect(formValues.web).toBeFalse();
  });

  it('should calculate the total correctly', () => {
    const form = component.presupuestoForm;
    form.patchValue({ seo: true });
    fixture.detectChanges();

    const expectedTotal = 300 + 3 * 2 * 30;
    expect(component.total).toBe(expectedTotal);
  });

  it('should display the correct total in the template', () => {
    const form = component.presupuestoForm;
    form.patchValue({ seo: true });
    fixture.detectChanges();

    const totalElement = fixture.debugElement.query(By.css('.mt-3 h3')).nativeElement;
    const expectedTotal = 300 + 3 * 2 * 30;
    expect(totalElement.textContent).toContain(`Preu pressupostat: ${expectedTotal} €`);
  });
});

*/


/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { BudgetService } from '../services/budget.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let budgetService: BudgetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HomeComponent],
      providers: [
        {
          provide: BudgetService,
          useValue: {
            getBudgetsObservable: () => of({
              seo: false, ads: false, web: false, pagines: 1, llenguatges: 1, total: 0
            }),
            updateBudget: () => {},
            getBudgets: () => ({
              seo: false, ads: false, web: false, pagines: 1, llenguatges: 1, total: 0
            })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    budgetService = TestBed.inject(BudgetService);
    fixture.detectChanges();
  });

  it('should calculate total correctly when services are selected', () => {
    component.presupuestoForm.patchValue({ seo: true, ads: true, web: true });
    component.calcularTotal(component.presupuestoForm.value);
    expect(component.total).toBe(1800);
  });

});
*/

/**ng test
 */