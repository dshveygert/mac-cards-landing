import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { PaymentService } from '../../payment/services/payment.service';
import { localStorageGetItem } from '../../../utils/localStorage';
import { ELocalStorage } from '../../api/models';

@Injectable({ providedIn: 'root' })
export class IsPaidGuard implements CanActivate {
  private hasPaidMarker(): boolean {
    if (!localStorage.getItem(ELocalStorage.payment_key)) {
      return false;
    }
    const marker = localStorageGetItem(ELocalStorage.payment_key, this.payment.crypto);
    return !!marker && JSON.parse(marker)?.status === 'succeeded';
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean {
    if (this.hasPaidMarker()) {
      return true;
    }
    return this.router.parseUrl('/payment');
  }

  constructor(private payment: PaymentService, private router: Router) {
  }
}
