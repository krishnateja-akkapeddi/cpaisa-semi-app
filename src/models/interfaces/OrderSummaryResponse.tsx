export interface OrderSummaryResponse {
  orders: OrderEntity[];
  success: boolean;
}

export interface OrderEntity {
  current_page: number;
  data: OrderEntityData;
  first_page_url: string;
  from: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
}

export interface OrderEntityData {
  orders: Order2[];
  order_statues: OrderStatusEntity[];
}

export interface Order2 {
  id: number;
  order_date: string;
  creator_name: string;
  total_amount: string;
  customer_uuid: string;
  app_code: string;
  receiver_name: string;
  receiver_type: string;
  line: string;
  landmark: string;
  city: string;
  district: string;
  pin_code: number;
  state: string;
  country: string;
}

export interface OrderStatusEntity {
  status: string;
  order_count: number;
  sub_order_count: number;
  total_amount: string;
}
