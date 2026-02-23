export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessage extends ContactFormData {
  id: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  stock: number;
  rating: number;
  discount?: number;
  isNew?: boolean;
  createdAt: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  products: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'paid' | 'unpaid' | 'refunded';
  createdAt: number;
}

export interface AdminContextType {
  products: Product[];
  orders: Order[];
  messages: ContactMessage[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

export interface UploadResponse {
  secure_url: string;
  public_id: string;
}

export type AlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question';