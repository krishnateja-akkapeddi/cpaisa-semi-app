export interface OfferListResponse {
  success: boolean;
  offers: Offers;
}

export interface Offers {
  current_page: number;
  data: OffersListEntity[];
  first_page_url: string;
  from: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
}

export interface OffersListEntity {
  product_id: number;
  organization_id: number;
  team_id: number;
  name: string;
  qty: number;
  offer_for: string;
  product_value: string;
  value_type: string;
  from_date: string;
  to_date: string;
  min_qty: number;
  variant_uuid?: string;
  state: string;
}
