export interface RegisterUser {
  register(params: RegisterUserParams.params): Promise<any>;
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
    gst_no: string;
    food_license_number: string;
    address: RegisterAddress;
    no_of_customer: string;
    annual_turnover: string;
    referred_by: string;
    creator_organization_id: string;
    whats_app_number: string;
  };
}

export type optionRegisterParams = Partial<RegisterUserParams.params>;
