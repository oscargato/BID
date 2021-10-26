import { TestBed } from '@angular/core/testing';

import { FRegistrarpagoService } from './f-registrarpago.service';

describe('FRegistrarpagoService', () => {
  let service: FRegistrarpagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FRegistrarpagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
