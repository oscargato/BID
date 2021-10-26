import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FRecepcionPlanosComponent } from './f-recepcion-planos.component';

describe('FRecepcionPlanosComponent', () => {
  let component: FRecepcionPlanosComponent;
  let fixture: ComponentFixture<FRecepcionPlanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FRecepcionPlanosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FRecepcionPlanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
