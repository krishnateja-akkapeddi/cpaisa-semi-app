import {OrderStatus} from '../../models/enum/OrderStatusEnum';
import {OrdersServiceResponse} from '../../models/interfaces/OrderServiceResponse';
import {OrdersListResponse} from '../../models/interfaces/OrdersListResponse';

export interface FetchOrdersList {
  fetch(
    page: number,
    params: FetchOrdersListParams.params,
  ): Promise<OrdersListResponse>;
}

export interface FetchOrdersServiceList {
  fetch(
    page: number,
    params: FetchOrdersListParams.params,
  ): Promise<OrdersServiceResponse>;
}

export namespace FetchOrdersListParams {
  export type params = {
    status: OrderStatus;
    q?: string;
    customer_uuid?: string;
    length?: number;
    from_date?: string;
    to_date?: string;
  };
}
