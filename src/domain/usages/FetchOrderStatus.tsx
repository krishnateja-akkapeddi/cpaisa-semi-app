import {OrderStatus} from '../../models/enum/OrderStatusEnum';
import {OrdersServiceResponse} from '../../models/interfaces/OrderServiceResponse';
import {OrderStatusResponse} from '../../models/interfaces/OrderStatusResponse';
import {OrdersListResponse} from '../../models/interfaces/OrdersListResponse';

export interface FetchOrderStatus {
  fetch(params: FetchOrderStatusParams.params): Promise<OrderStatusResponse>;
}

export namespace FetchOrderStatusParams {
  export type params = {
    orderId: number;
    subOrderId: number;
  };
}
