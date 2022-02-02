import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarFuncionarioComponent } from './activar-funcionario.component';

describe('ActivarFuncionarioComponent', () => {
  let component: ActivarFuncionarioComponent;
  let fixture: ComponentFixture<ActivarFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivarFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
