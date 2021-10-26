import { TestBed } from '@angular/core/testing';

import { TramitesDisponiblesService } from './tramites-disponibles.service';

describe('TramitesDisponiblesService', () => {
  let service: TramitesDisponiblesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TramitesDisponiblesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
