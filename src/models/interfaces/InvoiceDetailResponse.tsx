import {ErrorEntity} from './ErrorEntity';

export interface InvoiceDetailResponse {
  success: boolean;
  invoice_details: InvoiceDetail;
  errors: ErrorEntity;
}

export interface InvoiceDetail {
  id: number;
  customer_name: string;
  customer_gst_no: string;
  stockist_name: string;
  stockist_gst_no: string;
  invoice_date: string;
  uploaded_at: string;
  total_points: string;
  total_amount: string;
  invoice_items: InvoiceItemEntity[];
  image_url: string;
}

export interface InvoiceItemEntity {
  product_name: string;
  quantity: number;
  points: string;
  amount: string;
  status: string;
  rejection_reason: any;
}
