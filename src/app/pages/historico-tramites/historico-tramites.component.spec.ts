import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoTramitesComponent } from './historico-tramites.component';

describe('HistoricoTramitesComponent', () => {
  let component: HistoricoTramitesComponent;
  let fixture: ComponentFixture<HistoricoTramitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoTramitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoTramitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
