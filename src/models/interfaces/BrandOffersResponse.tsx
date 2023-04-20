export interface BrandOffersResponse {
  success: boolean;
  offers: BrandOffers;
}

export interface BrandOffers {
  current_page: number;
  data: BrandOfferEntity[];
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

export interface BrandOfferEntity {
  path: string;
  month_year: string;
  states: string;
  status: string;
  priority: number;
  organization_id: number;
  team_id: number;
  client_id: number;
  ga_priority: number;
  representative_details: RepresentativeDetails;
  show_subscription_button: boolean;
  show_upload_button: boolean;
}

export interface RepresentativeDetails {
  name: string;
  mobile: string;
}
