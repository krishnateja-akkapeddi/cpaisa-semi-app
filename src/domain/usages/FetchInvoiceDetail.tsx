import {InvoiceDetailResponse} from '../../models/interfaces/InvoiceDetailResponse';

export interface FetchInvcoiceDetail {
  fetch(id: string): Promise<InvoiceDetailResponse>;
}
