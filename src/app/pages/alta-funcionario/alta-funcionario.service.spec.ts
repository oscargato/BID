import { TestBed } from '@angular/core/testing';

import { AltaFuncionarioService } from './alta-funcionario.service';

describe('AltaFuncionarioService', () => {
  let service: AltaFuncionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AltaFuncionarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
