import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsLayoutPageComponent } from './documents-layout-page.component';

describe('DocumentsLayoutPageComponent', () => {
  let component: DocumentsLayoutPageComponent;
  let fixture: ComponentFixture<DocumentsLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentsLayoutPageComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
