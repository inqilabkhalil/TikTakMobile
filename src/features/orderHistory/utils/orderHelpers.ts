import { COLORS } from '@/shared/constants/theme';
import { OrderStatus, PaymentMethod } from '@/shared/types/order';

export function getStatusText(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.PENDING:
      return 'Sifariş qəbul edilib';
    case OrderStatus.CONFIRMED:
      return 'Təsdiqləndi';
    case OrderStatus.PREPARING:
      return 'Hazırlanır';
    case OrderStatus.READY:
      return 'Hazırdır';
    case OrderStatus.ON_THE_WAY:
      return 'Yoldadır';
    case OrderStatus.DELIVERED:
      return 'Çatdırıldı';
    case OrderStatus.CANCELLED:
      return 'Ləğv edildi';
    default:
      return status;
  }
}

export function getStatusColor(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.PENDING:
      return '#F5A623';
    case OrderStatus.CONFIRMED:
      return '#2196F3';
    case OrderStatus.PREPARING:
      return '#4A90E2';
    case OrderStatus.READY:
      return '#FF9800';
    case OrderStatus.ON_THE_WAY:
      return '#9013FE';
    case OrderStatus.DELIVERED:
      return '#76CB4F';
    case OrderStatus.CANCELLED:
      return '#F4333C';
    default:
      return COLORS.textSecondary;
  }
}

export function formatOrderDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function formatOrderNumber(orderNumber: string): string {
  const parts = orderNumber.split('-');
  const lastPart = parts[parts.length - 1];
  return `#${lastPart}`;
}

export function formatTotal(total: string): string {
  return `${total} AZN`;
}

export function formatDeliveryFee(fee: string): string {
  const numFee = parseFloat(fee);
  if (numFee === 0) {
    return 'Pulsuz';
  }
  return `${fee} AZN`;
}

export function getPaymentMethodText(method: PaymentMethod): string {
  switch (method) {
    case PaymentMethod.CARD:
      return 'Kart';
    case PaymentMethod.CASH:
      return 'Nağd';
  }
}
