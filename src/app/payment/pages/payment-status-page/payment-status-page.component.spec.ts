import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusPageComponent } from './payment-status-page.component';

describe('PaymentStatusPageComponent', () => {
  let component: PaymentStatusPageComponent;
  let fixture: ComponentFixture<PaymentStatusPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentStatusPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStatusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
