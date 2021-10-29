import { TestBed } from '@angular/core/testing';

import { TramitesFinalizadosService } from './tramites-finalizados.service';

describe('TramitesFinalizadosService', () => {
  let service: TramitesFinalizadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TramitesFinalizadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
