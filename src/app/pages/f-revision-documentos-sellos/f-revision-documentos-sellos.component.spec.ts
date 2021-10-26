import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FRevisionDocumentosSellosComponent } from './f-revision-documentos-sellos.component';

describe('FRevisionDocumentosSellosComponent', () => {
  let component: FRevisionDocumentosSellosComponent;
  let fixture: ComponentFixture<FRevisionDocumentosSellosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FRevisionDocumentosSellosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FRevisionDocumentosSellosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
