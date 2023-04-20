import {AuthResult} from './../../models/interfaces/AuthResponse';
export interface VerifyOtp {
  verify(params: VerifyOtpParams.params): Promise<AuthResult>;
}

export namespace VerifyOtpParams {
  export type params = {
    mobile: string;
    otp: string;
  };
}

export const f = {
  q: 'string',
  channel_partner_id: 1,
  status: ['fjfj', 'fjfj'],
  order_by: 'string',
  length: 200,
  from_date: 'ff',
  to_date: 'date_format:$dateFormat',
};
