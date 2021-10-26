import { TestBed } from '@angular/core/testing';

import { FRevisionDocumentosSellosService } from './f-revision-documentos-sellos.service';

describe('FRevisionDocumentosSellosService', () => {
  let service: FRevisionDocumentosSellosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FRevisionDocumentosSellosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
