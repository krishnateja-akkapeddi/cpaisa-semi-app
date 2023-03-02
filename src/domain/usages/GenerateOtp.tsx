import {GenerateOtpResponse} from '../../models/interfaces/GenerateOtpResponse';

export interface GenerateOtp {
  generate(params: GenerateOtpParams.params): Promise<GenerateOtpResponse>;
}

export type GenerateOtpMode = 'sms';

export namespace GenerateOtpParams {
  export type params = {
    mode: GenerateOtpMode;
    mobile_value: string;
  };
}
