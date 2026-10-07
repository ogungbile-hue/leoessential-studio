import { Currency } from '../types';

export function formatPrice(amountNgn: number, amountUsd: number, currency: Currency): string {
  if (currency === 'USD') {
    return `$${amountUsd.toLocaleString()}`;
  }
  return `₦${amountNgn.toLocaleString()}`;
}

export function formatPriceComparison(amountNgn: number, amountUsd: number, currentCurrency: Currency): string {
  if (currentCurrency === 'NGN') {
    return `approx. $${amountUsd.toLocaleString()}`;
  }
  return `approx. ₦${amountNgn.toLocaleString()}`;
}
