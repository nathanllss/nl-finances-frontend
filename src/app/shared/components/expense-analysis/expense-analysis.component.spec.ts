import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseAnalysisComponent } from './expense-analysis.component';

describe('ExpenseAnalysisComponent', () => {
  let component: ExpenseAnalysisComponent;
  let fixture: ComponentFixture<ExpenseAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
