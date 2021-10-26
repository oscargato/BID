import { TestBed } from '@angular/core/testing';

import { FSubsanarsolicitudService } from './f-subsanarsolicitud.service';

describe('FSubsanarsolicitudService', () => {
  let service: FSubsanarsolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FSubsanarsolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
