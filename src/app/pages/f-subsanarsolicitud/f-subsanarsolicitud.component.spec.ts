import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FSubsanarsolicitudComponent } from './f-subsanarsolicitud.component';

describe('FSubsanarsolicitudComponent', () => {
  let component: FSubsanarsolicitudComponent;
  let fixture: ComponentFixture<FSubsanarsolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FSubsanarsolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FSubsanarsolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
