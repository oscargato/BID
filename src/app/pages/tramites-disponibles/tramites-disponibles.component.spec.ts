import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesDisponiblesComponent } from './tramites-disponibles.component';

describe('TramitesDisponiblesComponent', () => {
  let component: TramitesDisponiblesComponent;
  let fixture: ComponentFixture<TramitesDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitesDisponiblesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
