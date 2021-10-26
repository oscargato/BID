import { TestBed } from '@angular/core/testing';

import { FCalculoImpuestoService } from './f-calculo-impuesto.service';

describe('FCalculoImpuestoService', () => {
  let service: FCalculoImpuestoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FCalculoImpuestoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
