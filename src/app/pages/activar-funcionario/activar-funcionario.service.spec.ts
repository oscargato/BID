import { TestBed } from '@angular/core/testing';

import { ActivarFuncionarioService } from './activar-funcionario.service';

describe('ActivarFuncionarioService', () => {
  let service: ActivarFuncionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivarFuncionarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
