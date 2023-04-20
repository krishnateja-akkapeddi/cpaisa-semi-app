import {RegisteredUserResponse} from '../../models/interfaces/RegisteredUserResponse';

export interface RegisterUser {
  register(params: RegisterUserParams.params): Promise<RegisteredUserResponse>;
}

export interface RegisterAddress {
  pincode: string;
  lat: string;
  long: string;
  line: string;
}

export namespace RegisterUserParams {
  export type params = {
    firm_name: string;
    type: string;
    mobile: string;
    gst_no?: string;
    pan_no?: string;
    dl_no?: string;
    address: RegisterAddress;
    no_of_customer: string;
    annual_turnover: string;
    referred_by: string;
    creator_organization_id: string;
    whats_app_number: string;
  };
}

export type OptionRegisterParams = Partial<RegisterUserParams.params>;
