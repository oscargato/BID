import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesARevisarComponent } from './tramites-a-revisar.component';

describe('TramitesARevisarComponent', () => {
  let component: TramitesARevisarComponent;
  let fixture: ComponentFixture<TramitesARevisarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitesARevisarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesARevisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
