import {QrCodeResponse} from '../../models/interfaces/QrCodeResponse';
export interface GenerateQrCode {
  generate(params: GenerateQrCodeParams.params): Promise<QrCodeResponse>;
}

export namespace GenerateQrCodeParams {
  export type params = {
    lat?: number;
    long?: number;
  };
}
