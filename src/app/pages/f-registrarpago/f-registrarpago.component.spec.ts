import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FRegistarpagoComponent } from './f-registrarpago.component';

describe('FRegistarpagoComponent', () => {
  let component: FRegistarpagoComponent;
  let fixture: ComponentFixture<FRegistarpagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FRegistarpagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FRegistarpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
