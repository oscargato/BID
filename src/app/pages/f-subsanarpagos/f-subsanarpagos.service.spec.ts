import { TestBed } from '@angular/core/testing';

import { FSubsanarpagosService } from './f-subsanarpagos.service';

describe('FSubsanarpagosService', () => {
  let service: FSubsanarpagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FSubsanarpagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
