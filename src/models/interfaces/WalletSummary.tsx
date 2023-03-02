export interface WalletSummaryResponse {
  success: boolean;
  wallet_summary: WalletSummary;
}
export interface WalletSummary {
  channel_partner_id: number;
  firm_name: string;
  gst_no: string;
  total_pending_points: number;
  total_redeemable_points: number;
  current_month_earning: string;
  last_month_earning: string;
  wallet_summaries?: WalletSummaryEntity[];
}
export interface WalletSummaryEntity {
  organization_name: string;
  organization_code: string;
  division_name: string;
  division_code: string;
  redeemable_points: string;
  redeemed_points: string;
}
