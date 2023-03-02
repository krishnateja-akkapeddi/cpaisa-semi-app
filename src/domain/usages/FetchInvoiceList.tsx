import {InvoiceListResponse} from '../../models/interfaces/InvoiceListResponse';

export interface FetchInvcoiceList {
  fetch(
    page: number,
    params: FetchInvoiceListParams.params,
  ): Promise<InvoiceListResponse>;
}

export namespace FetchInvoiceListParams {
  export type params = {
    q?: string;
    channel_partner_id?: number;
    status?: string[];
    order_by?: string;
    length?: number;
    from_date?: string;
    to_date?: string;
  };
}
