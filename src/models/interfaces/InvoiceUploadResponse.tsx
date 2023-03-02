export interface InvoiceUploadResponse {
  success: boolean;
  invoice: InvoiceUploadedInfo;
  errors?: {
    image?: string;
    invoice?: string;
  };
}

export interface InvoiceUploadedInfo {
  id: number;
  firm_name: string;
  owner_name: any;
  customer_gst_no: string;
  customer_dl_no: string;
  supplier_name: any;
  supplier_gst_no: any;
  supplier_dl_no: any;
  invoice_no: any;
  invoice_date: any;
  invoice_month_year: any;
  total_amount: string;
  status: string;
  comments: any;
  total_points: string;
  image_id: number;
  created_by: number;
  updated_by: number;
  channel_partner_id: number;
  created_at: string;
  supplier_id: any;
  organization_id: any;
  whats_app_upload: number;
  image: InvoiceImageInfo;
}

export interface InvoiceImageInfo {
  id: number;
  path: string;
  size: number;
  type: string;
  mime_type: string;
  universal_id: string;
  read_url: any;
  is_uploading_to_bucket: number;
}
