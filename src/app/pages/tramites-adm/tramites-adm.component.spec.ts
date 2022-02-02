import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesAdmComponent } from './tramites-adm.component';

describe('TramitesAdmComponent', () => {
  let component: TramitesAdmComponent;
  let fixture: ComponentFixture<TramitesAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitesAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
