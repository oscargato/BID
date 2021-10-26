import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FSubsanarpagosComponent } from './f-subsanarpagos.component';

describe('FSubsanarpagosComponent', () => {
  let component: FSubsanarpagosComponent;
  let fixture: ComponentFixture<FSubsanarpagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FSubsanarpagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FSubsanarpagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
