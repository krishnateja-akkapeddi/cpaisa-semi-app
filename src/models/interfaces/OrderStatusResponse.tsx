export interface OrderStatusResponse {
  success: boolean;
  order_logs: OrderLogEntity[];
}

export interface OrderLogEntity {
  id: number;
  status: string;
  comments: string;
  created_at: string;
  updated_at: string;
}
