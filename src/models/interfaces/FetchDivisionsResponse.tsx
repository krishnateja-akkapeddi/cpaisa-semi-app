import {ErrorEntity} from './ErrorEntity';

export interface FetchDivisionsResponse {
  success: boolean;
  errors?: ErrorEntity;
  organizations: DivisionEntity[];
}

export interface DivisionEntity {
  id: number;
  name: string;
  code: string;
  parent_code?: string;
  wallet_code?: string;
  woohoo_code?: string;
  redeem_from_day?: number;
  redeem_to_day?: number;
  status: string;
  cp_subscription_visible: number;
  image_id?: number;
  redeem_partner_image?: string;
  current_balance: string;
  consumed_balance?: string;
  states?: string;
  cus_code?: string;
  image?: Image;
  team: Team[];
}

export interface Image {
  id: number;
  path: string;
  size: any;
  type: any;
  mime_type: any;
  universal_id: any;
  read_url: any;
  is_uploading_to_bucket: number;
}

export interface Team {
  id: number;
  name: string;
  short_code: string;
  organization_id: number;
  client_id?: number;
  parent_organization_name: string;
  parent_organization_code?: string;
  is_oderable: number;
  display_name: string;
  status: string;
  rule_engine_code: string;
  states?: string;
}
