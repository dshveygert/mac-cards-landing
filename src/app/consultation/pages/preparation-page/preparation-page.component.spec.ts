import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationPageComponent } from './preparation-page.component';

describe('PreparationPageComponent', () => {
  let component: PreparationPageComponent;
  let fixture: ComponentFixture<PreparationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreparationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreparationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
