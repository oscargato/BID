import { TestBed } from '@angular/core/testing';

import { TramitesRevisarService } from './tramites-revisar.service';

describe('TramitesRevisarService', () => {
  let service: TramitesRevisarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TramitesRevisarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
