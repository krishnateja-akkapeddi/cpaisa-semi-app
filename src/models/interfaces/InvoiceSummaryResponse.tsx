export interface InvoiceSummaryResponse {
  success: boolean;
  invoice_overview: InvoiceOverview;
}
export interface InvoiceOverview {
  monthly_invoice_status?: MonthlyInvoiceStatusEntity[];
  overall_invoice_status: OverallInvoiceStatus;
}
export interface MonthlyInvoiceStatusEntity {
  total_invoices: number;
  month: string;
  year: string;
  month_year: string;
  approved_invoice_count: number;
  approved_amount: number;
  approved_point: number;
  pending_invoice_count: number;
  pending_amount: number;
  pending_point: number;
  rejected_invoice_count: number;
  rejected_point: number;
  rejected_amount: number;
}
export interface OverallInvoiceStatus {
  total_invoices: number;
  approved_invoice_count: number;
  approved_amount: number;
  approved_points: string;
  pending_invoice_count: number;
  pending_amount: string;
  pending_points: number;
  rejected_invoice_count: number;
  rejected_amount: number;
  rejected_points: number;
}
