import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FPermisoConstruccionPlanosComponent } from './f-permiso-construccion-planos.component';

describe('FPermisoConstruccionPlanosComponent', () => {
  let component: FPermisoConstruccionPlanosComponent;
  let fixture: ComponentFixture<FPermisoConstruccionPlanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FPermisoConstruccionPlanosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FPermisoConstruccionPlanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
