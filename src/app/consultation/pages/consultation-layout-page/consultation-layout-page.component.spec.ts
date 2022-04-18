import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationLayoutPageComponent } from './consultation-layout-page.component';

describe('ConsultationLayoutPageComponent', () => {
  let component: ConsultationLayoutPageComponent;
  let fixture: ComponentFixture<ConsultationLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationLayoutPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
