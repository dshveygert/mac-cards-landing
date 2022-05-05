import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationNavigationMenuComponent } from './consultation-navigation-menu.component';

describe('ConsultationNavigationMenuComponent', () => {
  let component: ConsultationNavigationMenuComponent;
  let fixture: ComponentFixture<ConsultationNavigationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationNavigationMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationNavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
