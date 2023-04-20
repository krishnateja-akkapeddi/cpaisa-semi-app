export interface SingleOrderResponse {
  success: boolean;
  order: SingleOrder;
}

export interface SingleOrder {
  id: number;
  app_code: string;
  order_date: string;
  total_amount: string;
  creator_name: string;
  customer_uuid: string;
  name: string;
  mobile: string;
  whatsapp_number: string;
  type: string;
  gst_no: string;
  dl_no: string;
  pan_no: string;
  sub_orders: SubOrderEntity[];
}

export interface SubOrderEntity {
  id: number;
  fulfillment_uuid: string;
  reference_number: string;
  total_amount: string;
  rejection_reason: any;
  status: string;
  dispatch_date: any;
  delivery_date: any;
  comments: any;
  order_id: number;
  delivery_address_id: number;
  address: Address;
  suppliers: Supplier[];
  items: SubOrderItemEntity[];
}

export interface Address {
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

export interface Supplier {
  id: number;
  name: string;
  gst_no: string;
  dl_no: string;
  pan_no: string;
  supplier_uuid: string;
  priority: number;
  action_expired_at?: string;
  status: string;
  reference_number: string;
}

export interface SubOrderItemEntity {
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
