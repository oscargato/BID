import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FCalculoImpuestoComponent } from './f-calculo-impuesto.component';

describe('FCalculoImpuestoComponent', () => {
  let component: FCalculoImpuestoComponent;
  let fixture: ComponentFixture<FCalculoImpuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FCalculoImpuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FCalculoImpuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
