export interface OffersResponse {
  success: boolean;
  offers?: OfferEntity[];
}
export interface OfferEntity {
  id: number;
  path: string;
  month_year: string;
  states?: string | null;
  status: string;
  priority: number;
  organization_id?: number | null;
  team_id?: number | null;
  acp_in_district: number;
  can_upload_invoice: boolean;
  points_earned: number;
  can_redeem_points: number;
}
