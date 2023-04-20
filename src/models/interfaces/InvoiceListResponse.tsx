import ReviewStatus from '../enum/ReviewStatus';

export interface InvoiceListResponse {
  success: boolean;
  invoices: InvoiceListEntity[];
  total: number;
  last_page: number;
}

export interface InvoiceListEntity {
  id: number;
  firm_name: string;
  customer_gst_no: string;
  supplier_name: string;
  supplier_gst_no: string;
  invoice_no: string;
  invoice_date: string;
  comments?: string;
  whats_app_upload: number;
  upload_date: string;
  pin_code: number;
  district?: string;
  state?: string;
  cp_status: ReviewStatus;
  total_points: number;
  total_amount: number;
  invoice_items?: InvoiceItem[];
  invoice_status?: string;
}

export interface InvoiceItem {
  invoice_id: number;
  points: string;
  organization_id: number;
  auto_approved: number;
  status: string;
  on_hold: number;
  on_hold_comment: any;
  rejection_reason?: string;
  product: string;
  organization: string;
}
