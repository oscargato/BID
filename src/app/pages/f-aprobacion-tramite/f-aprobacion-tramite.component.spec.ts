import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAprobacionTramiteComponent } from './f-aprobacion-tramite.component';

describe('FAprobacionTramiteComponent', () => {
  let component: FAprobacionTramiteComponent;
  let fixture: ComponentFixture<FAprobacionTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAprobacionTramiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FAprobacionTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
