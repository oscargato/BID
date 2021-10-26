import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FRevisionPagoComponent } from './f-revision-pago.component';

describe('FRevisionPagoComponent', () => {
  let component: FRevisionPagoComponent;
  let fixture: ComponentFixture<FRevisionPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FRevisionPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FRevisionPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
