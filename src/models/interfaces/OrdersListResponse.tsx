export interface OrdersListResponse {
  success: boolean;
  orders: Order[];
}

export interface Order {
  current_page: number;
  data: OrderEntity[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface OrderEntity {
  id: number;
  order_uuid?: string;
  reference_number: string;
  order_date: string;
  order_status: string;
  creator_name: string;
  channel_partner_id: number;
  remaining_resend_count: number;
  firm_name: string;
  gst_no: string;
  dl_no: string;
  mobile: string;
  whatsapp: string;
  ordered_organizations: OrderedOrganization[];
  delivery_address: DeliveryAddress;
}

export interface OrderedOrganization {
  organization_code: string;
  selected_suppliers: SelectedSupplier[];
  ordered_items: OrderedItem[];
}

export interface SelectedSupplier {
  supplier_uuid: string;
  name: string;
  pan_no: string;
  gst_no: string;
  dl_no: string;
  supplier_type: string;
  priority: number;
}

export interface OrderedItem {
  brand_name: string;
  product_name: string;
  uom: string;
  quantity: number;
  unit_price: number;
  division_code: string;
  organization_code: string;
}

export interface DeliveryAddress {
  line: string;
  landmark: string;
  district: string;
  city: string;
  pin_code: number;
  state: string;
  country: string;
  lat: string;
  long: string;
}
