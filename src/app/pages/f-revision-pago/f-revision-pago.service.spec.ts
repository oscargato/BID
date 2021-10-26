import { TestBed } from '@angular/core/testing';

import { FRevisionPagoService } from './f-revision-pago.service';

describe('FRevisionPagoService', () => {
  let service: FRevisionPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FRevisionPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
