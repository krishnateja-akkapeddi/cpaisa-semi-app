import {RegisterUserParams} from '../../domain/usages/RegisterUser';

export type RegistrationError = {
  message: string;
};

export interface RegisteredUserResponse {
  user: RegisteredUser;
  channel_partner: RegisteredChannelPartner;
  success: boolean;
  errors?: RegisterUserParams.params & RegistrationError;
}

export interface RegisteredUser {
  id: number;
  full_name: string;
  username: string;
  mobile: string;
  otp: any;
  email: any;
  terms_is_agreed: number;
  status: string;
  role_id: number;
  headquarter_id: any;
  organization_id: any;
  email_verified: number;
  verification_token: any;
  token: any;
  wallet_token: any;
  whats_app_number: string;
  approver: number;
  can_channel_partner_profile: number;
  whats_app_number_verified: number;
  master_coupon_link_code: any;
  is_generating_master_gorupi_link: number;
  can_place_order: number;
  role: RegisteredUserRole;
  role_str: string;
  auth_token: string;
}

export interface RegisteredUserRole {
  id: number;
  name: string;
}

export interface RegisteredChannelPartner {
  id: number;
  code: any;
  firm_name: string;
  firm_contact: string;
  firm_pan_no: any;
  owner_name: any;
  owner_pan_no: any;
  email: any;
  dl_no: string;
  gst_no: string;
  pan_no: any;
  gst_valid: number;
  registration_no: any;
  no_of_customer: number;
  annual_turnover: number;
  referral_code: any;
  referred_by: any;
  loyalty_status: string;
  address_id: number;
  channel_partner_type_id: number;
  image_id: any;
  user_id: number;
  created_by: number;
  updated_by: number;
  created_at: string;
  type: string;
  state: string;
  state_id: any;
  classification: string;
  creator_organization_id: number;
  rgdt: any;
  status: string;
  comments: any;
  pin_code: number;
  gst_api_count: number;
  district: any;
  universal_id: any;
  whatsapp_message_id: any;
  whatsapp_delivery_status: string;
  tax_percentage: string;
  new_universal_id: string;
  food_license_number: any;
  address: Address;
  image: any;
}

export interface Address {
  id: number;
  line: string;
  landmark: any;
  lat: any;
  long: any;
  pincode_id: number;
  area_id: any;
  taluka_id: any;
  district_id: any;
  state_id: number;
  country_id: number;
  bnm: any;
  st: any;
  loc: any;
  bno: any;
  stcd: any;
  dst: any;
  city: any;
  flno: any;
  lt: any;
  pncd: any;
  lg: any;
  rgdt: any;
  country: Country;
  state: State;
  district: any;
  taluka: any;
  area: any;
  pincode: string;
  state_str: string;
  country_str: string;
}

export interface Country {
  id: number;
  name: string;
  status: string;
}

export interface State {
  id: number;
  name: string;
  status: string;
  country_id: number;
}
