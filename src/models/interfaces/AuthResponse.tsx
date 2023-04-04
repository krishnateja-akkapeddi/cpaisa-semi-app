import {ErrorEntity} from './ErrorEntity';

export interface AuthResult {
  success: boolean;
  data: Data;
  errors?: ErrorEntity;
}

export interface Data {
  message: string;
  isMobileNumberRegistered: boolean;
  user: User;
  channel_partner: ChannelPartner;
}

export interface User {
  id: number;
  full_name: string;
  username: string;
  mobile: string;
  email_id: string;
  whats_app_number: string;
  status: string;
  terms_is_agreed: number;
  role_id: number;
  role: string;
  auth_token: string;
  is_generating_master_gorupi_link: number;
  master_coupon_link_code: string;
}

export interface ChannelPartner {
  id: number;
  firm_name: string;
  firm_contact: string;
  dl_no: string;
  pan_no: any;
  gst_no: string;
  gst_valid: number;
  address: Address;
  channel_partner_type: ChannelPartnerType;
}

export interface Address {
  id: number;
  pin_code: any;
  line: string;
  landmark: any;
  city: any;
  district: any;
  state: State;
  country: any;
  lat: string;
  long: string;
}

export interface State {
  id: number;
  name: string;
  status: string;
  country_id: number;
}

export interface ChannelPartnerType {
  id: number;
  name: string;
  display_name: any;
}
