import type { OrderStatus } from '../types/order';

export function getStatusText(status: OrderStatus): string {
  switch (status) {
    case 'PENDING':
      return 'Sifariş qəbul edilib';
    case 'PREPARING':
      return 'Hazırlanır';
    case 'ON_THE_WAY':
      return 'Yoldadır';
    case 'DELIVERED':
      return 'Çatdırıldı';
    case 'CANCELLED':
      return 'Ləğv edildi';
  }
}

export function getStatusColor(status: OrderStatus): string {
  switch (status) {
    case 'PENDING':
      return '#F5A623'; 
    case 'PREPARING':
      return '#4A90E2'; 
    case 'ON_THE_WAY':
      return '#9013FE'; 
    case 'DELIVERED':
      return '#76CB4F'; 
    case 'CANCELLED':
      return '#F4333C'; 
  }
}

export function formatOrderDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}