import { IConsultationResponse, IPaymentResponse, TConsultationStatus, TPaymentStatus } from '../app/api/models';
import { environment } from '../environments/environment';

export function generateMagicPayment(paymentId: string, status: TPaymentStatus = 'pending'): IPaymentResponse {
  return {
    message: 'success',
    uuid: '',
    payment: {
      id: paymentId,
      status,
      amount: {
        value: `${environment.price.one_time}.00`,
        currency: 'RUB',
      },
      description: 'Magic payment',
      created_at: nowTime('iso'),
      test: true,
      paid: status === 'succeeded',
    },
  };
}

export function generateMagicConsultationStatus(paymentId: string, status: TConsultationStatus = 'pending'): IConsultationResponse {
  const captured_at = status === 'expired' ? new Date('2015-03-25T12:05:00Z') : new Date();
  const created_at = status === 'expired' ? new Date('2015-03-25T12:00:00Z') : new Date();
  return {
    message: 'success',
    uuid: '',
    status: {
      id: paymentId,
      captured_at: nowTime('iso', captured_at),
      created_at: nowTime('iso', created_at),
      status,
      test: true,
    },
  };
}

export function nowTime(format: 'iso' | 'unix' | 'custom' = 'custom', date = new Date()): string {
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = addZeroToNumber(date.getDate());
  const h = addZeroToNumber(date.getHours());
  const m = addZeroToNumber(date.getMinutes());
  const s = addZeroToNumber(date.getSeconds());

  switch (format) {
    case 'iso':
      return `${date.getFullYear()}-${month}-${day}T${h}:${m}:${s}.000Z`;
    case 'unix':
      return `${date.getTime()}`;
    default:
      return `${date.getFullYear()}-${month}-${day} ${h}:${m}:${s}`;
  }
}

function addZeroToNumber(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}
