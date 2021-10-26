import { TestBed } from '@angular/core/testing';

import { FPermisoConstruccionPlanosService } from './f-permiso-construccion-planos.service';

describe('FPermisoConstruccionPlanosService', () => {
  let service: FPermisoConstruccionPlanosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FPermisoConstruccionPlanosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
