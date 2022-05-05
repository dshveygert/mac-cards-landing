import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPageComponent } from './final-page.component';

describe('FinalPageComponent', () => {
  let component: FinalPageComponent;
  let fixture: ComponentFixture<FinalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
