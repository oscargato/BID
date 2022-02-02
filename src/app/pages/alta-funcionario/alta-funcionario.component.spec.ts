import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaFuncionarioComponent } from './alta-funcionario.component';

describe('AltaFuncionarioComponent', () => {
  let component: AltaFuncionarioComponent;
  let fixture: ComponentFixture<AltaFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
