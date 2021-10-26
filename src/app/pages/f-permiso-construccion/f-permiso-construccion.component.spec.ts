import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FPermisoConstruccionComponent } from './f-permiso-construccion.component';

describe('FPermisoConstruccionComponent', () => {
  let component: FPermisoConstruccionComponent;
  let fixture: ComponentFixture<FPermisoConstruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FPermisoConstruccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FPermisoConstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
