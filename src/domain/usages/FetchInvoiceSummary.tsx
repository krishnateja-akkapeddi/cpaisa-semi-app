import {InvoiceSummaryResponse} from '../../models/interfaces/InvoiceSummaryResponse';

export interface FetchInvcoiceSummary {
  fetch(
    params: FetchInvoiceSummaryParams.params,
  ): Promise<InvoiceSummaryResponse>;
}

export namespace FetchInvoiceSummaryParams {
  export type params = {
    start_date?: string;
    end_date?: string;
  };
}
