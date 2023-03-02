import {InvoiceUploadResponse} from '../../models/interfaces/InvoiceUploadResponse';

export interface UploadInvoice {
  upload(params: FormData): Promise<InvoiceUploadResponse>;
}

export namespace UploadInvoiceParams {
  export type params = {
    data: FormData;
  };
}
