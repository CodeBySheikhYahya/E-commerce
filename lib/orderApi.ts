// Order API functions
export interface OrderRequest {
  customerName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  discount: number;
  amount: number;
  items: OrderItemRequest[];
  createdByUserId?: number;
}

export interface OrderItemRequest {
  productCode: string;
  productName: string;
  quantityID: number;
  colorID: number;
  sizeID: number;
  unitPrice: number;
}

export interface OrderResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    orderNumber?: string;
  } | string[];
}

export async function createOrder(orderData: OrderRequest): Promise<OrderResponse> {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();
  
  // Backend returns error format even for 400+ status codes
  // So we return the data as-is (it has success, statusCode, message, data)
  return data;
}

