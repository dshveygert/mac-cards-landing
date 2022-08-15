import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLayoutPageComponent } from './payment-layout-page.component';

describe('PaymentLayoutPageComponent', () => {
  let component: PaymentLayoutPageComponent;
  let fixture: ComponentFixture<PaymentLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentLayoutPageComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
