import {OrderSummaryResponse} from '../../models/interfaces/OrderSummaryResponse';

export interface FetchOrderSummary {
  fetch(params: FetchOrderSummaryParams.params): Promise<OrderSummaryResponse>;
}

export namespace FetchOrderSummaryParams {
  export type params = {
    app_code: string;
    organization_code?: null | string;
    division_code?: null | string;
    ga_headquarter_code?: null | string;
    order_by?: 'ASC' | 'DESC';
    from_date?: string | null;
    to_date?: string | null;
    q?: string;
    length?: string;
    customer_uuid?: string;
  };
}
