import {AuthResult, Data} from '../models/interfaces/AuthResponse';
import {RegisteredUserResponse} from '../models/interfaces/RegisteredUserResponse';

export function convertToAuthResult(
  response: RegisteredUserResponse,
): AuthResult {
  const data: Data = {
    message: '',
    isMobileNumberRegistered: !!response.user.mobile,
    user: {
      id: response.user.id,
      full_name: response.user.full_name,
      username: response.user.username,
      mobile: response.user.mobile,
      email_id: response.user.email ?? '',
      whats_app_number: response.user.whats_app_number,
      status: response.user.status,
      terms_is_agreed: response.user.terms_is_agreed,
      role_id: response.user.role_id,
      role: response.user.role.name,
      auth_token: response.user.auth_token,
      is_generating_master_gorupi_link:
        response.user.is_generating_master_gorupi_link,
      master_coupon_link_code: response.user.master_coupon_link_code ?? '',
    },
    channel_partner: {
      universal_id: response?.channel_partner?.universal_id,
      id: response.channel_partner.id,
      firm_name: response.channel_partner.firm_name,
      firm_contact: response.channel_partner.firm_contact,
      dl_no: response.channel_partner.dl_no,
      pan_no: response.channel_partner.firm_pan_no
        ? response.channel_partner.pan_no
        : '',
      gst_no: response.channel_partner.gst_no,
      gst_valid: response.channel_partner.gst_valid,
      address: {
        id: response.channel_partner.address.id,
        pin_code: response.channel_partner.address.pincode,
        line: response.channel_partner.address.line,
        landmark: response.channel_partner.address.landmark,
        city: response.channel_partner.address.city,
        district: response.channel_partner.address.district,
        state: {
          id: response.channel_partner.address.state.id,
          name: response.channel_partner.address.state.name,
          status: response.channel_partner.address.state.status,
          country_id: response.channel_partner.address.state.country_id,
        },
        country: response.channel_partner.address.country,
        lat: response.channel_partner.address.lat ?? '',
        long: response.channel_partner.address.long ?? '',
      },
      channel_partner_type: {
        id: response.channel_partner.channel_partner_type_id,
        name: response.channel_partner.type,
        display_name: response.channel_partner.classification ?? '',
      },
    },
  };

  const errors = response.errors ?? {};

  return {
    success: response.success,
    data,
  };
}
