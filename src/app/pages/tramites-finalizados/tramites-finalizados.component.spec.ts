import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesFinalizadosComponent } from './tramites-finalizados.component';

describe('TramitesFinalizadosComponent', () => {
  let component: TramitesFinalizadosComponent;
  let fixture: ComponentFixture<TramitesFinalizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitesFinalizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesFinalizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
