import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FTareaInspeccionComponent } from './f-tarea-inspeccion.component';

describe('FTareaInspeccionComponent', () => {
  let component: FTareaInspeccionComponent;
  let fixture: ComponentFixture<FTareaInspeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FTareaInspeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FTareaInspeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
