import {ErrorEntity} from './ErrorEntity';

export interface OrdersServiceResponse {
  success: boolean;
  orders: OrderServiceEntity[];
  errors?: ErrorEntity;
}

export interface OrderServiceEntity {
  current_page: number;
  data: OrderServiceData;
  first_page_url: string;
  from: number;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  last_page: number;
}

export interface OrderServiceData {
  orders: OrderServiceItemEntity[];
  order_statues: OrderStatusEntity[];
}

export interface OrderServiceItemEntity {
  app_code: string;
  order_id: number;
  sub_order_id: number;
  order_date: string;
  status: string;
  total_amount: string;
  dispatch_date: any;
  delivery_date: any;
  creator_name: string;
  customer_uuid: string;
  name: string;
  mobile: string;
  whatsapp_number: string;
  type: string;
  gst_no: string;
  dl_no: string;
  pan_no: string;
  address: OrderServiceAddress;
  suppliers: OrderServiceSupplierEntity[];
  items: OrderServiceSubItemEntity[];
}

export interface OrderServiceAddress {
  id: number;
  pin_code: number;
  line: string;
  landmark: string;
  city: string;
  district: string;
  state: string;
  country: string;
  lat: string;
  long: string;
}

export interface OrderServiceSupplierEntity {
  id: number;
  name: string;
  gst_no: string;
  dl_no: string;
  pan_no: string;
  supplier_uuid: string;
  priority: number;
  action_expired_at: any;
  status: string;
  reference_number: string;
}

export interface OrderServiceSubItemEntity {
  id: number;
  brand_name: string;
  product_name: string;
  uom: string;
  unit_price: string;
  quantity: number;
  total_amount: string;
  brand_uuid: string;
  product_uuid: string;
  uom_uuid: string;
  organization_code: string;
  division_code: string;
  ga_headquarter_code: string;
  order_id: number;
  sub_order_id: number;
  created_at: string;
  updated_at: string;
}

export interface OrderStatusEntity {
  status: string;
  order_count: number;
  sub_order_count: number;
  total_amount: string;
}
