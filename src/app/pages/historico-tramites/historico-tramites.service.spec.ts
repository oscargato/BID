import { TestBed } from '@angular/core/testing';

import { HistoricoTramitesService } from './historico-tramites.service';

describe('HistoricoTramitesService', () => {
  let service: HistoricoTramitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoTramitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
