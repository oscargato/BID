import { TestBed } from '@angular/core/testing';

import { FTareaInspeccionService } from './f-tarea-inspeccion.service';

describe('FTareaInspeccionService', () => {
  let service: FTareaInspeccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FTareaInspeccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
