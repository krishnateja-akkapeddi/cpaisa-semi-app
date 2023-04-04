import {ErrorEntity} from './ErrorEntity';

export interface CouponPartnersResponse {
  success: boolean;
  rewards: CouponPartnerEntity[];
  total: number;
  reward_request: number;
  email: string;
  errors?: ErrorEntity;
}

export interface CouponPartnerEntity {
  id: number;
  points: number;
  organization_id: any;
  redeem_partner_id: number;
  redeem_partner: RedeemPartner;
}

export interface RedeemPartner {
  id: number;
  name: string;
  image_id: number;
  min_amount: string;
  max_amount: string;
  woohoo_sku: string;
  wallet_link: string;
  image: Image;
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
