import { TestBed } from '@angular/core/testing';

import { FAprobacionTramiteService } from './f-aprobacion-tramite.service';

describe('FAprobacionTramiteService', () => {
  let service: FAprobacionTramiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FAprobacionTramiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
