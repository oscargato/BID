import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FDisponiblesComponent } from './f-disponibles.component';

describe('FDisponiblesComponent', () => {
  let component: FDisponiblesComponent;
  let fixture: ComponentFixture<FDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FDisponiblesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
