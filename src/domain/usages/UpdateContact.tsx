import {UpdatedContactResponse} from '../../models/interfaces/UpdateContactResponse';

export interface UpdateContact {
  update(params: UpdateContactParams.params): Promise<UpdatedContactResponse>;
}

export type contactType = 'whatsapp_value' | 'mobile_value' | 'email_value';
export type modeType = 'whatsapp' | 'mobile' | 'email';

export namespace UpdateContactParams {
  export type params = {
    mode: modeType;
    otp: number;
  } & {[K in contactType]?: number};
}
