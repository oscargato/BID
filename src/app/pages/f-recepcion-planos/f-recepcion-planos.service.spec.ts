import { TestBed } from '@angular/core/testing';

import { FRecepcionPlanosService } from './f-recepcion-planos.service';

describe('FRecepcionPlanosService', () => {
  let service: FRecepcionPlanosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FRecepcionPlanosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
