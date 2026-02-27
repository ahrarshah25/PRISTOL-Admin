import type { Order } from '../types';

type RawOrderItem = {
  productId?: string;
  name?: string;
  price?: number | string;
  quantity?: number | string;
  imageUrl?: string;
};

type RawOrder = Partial<Order> & {
  items?: RawOrderItem[];
  products?: RawOrderItem[];
  totalAmount?: number | string;
  total?: number | string;
  subtotal?: number | string;
  shipping?: number | string;
  tax?: number | string;
  createdAt?: number | string;
  orderDate?: number | string;
};

const toNumber = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const toStringValue = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return '';
};

export const normalizeOrder = (rawOrder: RawOrder): Order => {
  const rawItems = Array.isArray(rawOrder.products)
    ? rawOrder.products
    : Array.isArray(rawOrder.items)
      ? rawOrder.items
      : [];

  const products = rawItems.map((item, index) => ({
    productId: toStringValue(item?.productId) || `unknown-${index}`,
    name: toStringValue(item?.name) || 'Unnamed Product',
    price: toNumber(item?.price),
    quantity: toNumber(item?.quantity) || 1,
    imageUrl: toStringValue(item?.imageUrl)
  }));

  return {
    ...rawOrder,
    customerName: toStringValue(rawOrder.customerName) || toStringValue(rawOrder.fullName),
    customerEmail: toStringValue(rawOrder.customerEmail) || toStringValue(rawOrder.email),
    customerPhone: toStringValue(rawOrder.customerPhone) || toStringValue(rawOrder.phone),
    fullName: toStringValue(rawOrder.fullName) || toStringValue(rawOrder.customerName),
    email: toStringValue(rawOrder.email) || toStringValue(rawOrder.customerEmail),
    phone: toStringValue(rawOrder.phone) || toStringValue(rawOrder.customerPhone),
    address: toStringValue(rawOrder.address),
    city: toStringValue(rawOrder.city),
    postalCode: toStringValue(rawOrder.postalCode),
    products,
    totalAmount: toNumber(rawOrder.totalAmount) || toNumber(rawOrder.total),
    total: toNumber(rawOrder.total) || toNumber(rawOrder.totalAmount),
    subtotal: toNumber(rawOrder.subtotal),
    shipping: toNumber(rawOrder.shipping),
    tax: toNumber(rawOrder.tax),
    createdAt: toNumber(rawOrder.createdAt) || Date.now(),
    orderDate: toNumber(rawOrder.orderDate) || toNumber(rawOrder.createdAt) || Date.now(),
    status: (rawOrder.status as Order['status']) || 'pending',
    paymentMethod: toStringValue(rawOrder.paymentMethod) || 'N/A',
    paymentStatus: (rawOrder.paymentStatus as Order['paymentStatus']) || 'unpaid',
    orderType: (rawOrder.orderType as Order['orderType']) || 'product'
  } as Order;
};
