import { TestBed } from '@angular/core/testing';

import { FPermisoConstruccionService } from './f-permiso-construccion.service';

describe('FPermisoConstruccionService', () => {
  let service: FPermisoConstruccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FPermisoConstruccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
