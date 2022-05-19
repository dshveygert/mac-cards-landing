import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBackPageComponent } from './payment-back-page.component';

describe('PaymentBackPageComponent', () => {
  let component: PaymentBackPageComponent;
  let fixture: ComponentFixture<PaymentBackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentBackPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
