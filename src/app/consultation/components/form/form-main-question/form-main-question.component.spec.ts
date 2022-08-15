import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMainQuestionComponent } from './form-main-question.component';

describe('FormMainQuestionComponent', () => {
  let component: FormMainQuestionComponent;
  let fixture: ComponentFixture<FormMainQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormMainQuestionComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMainQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
