import {OrderStatus} from '../../models/enum/OrderStatusEnum';
import {ChangesOrderStatusResponse} from '../../models/interfaces/ChangesOrderStatusResponse';

export interface ChangeOrderStatus {
  change(
    params: ChangeOrderStatusParams.params,
  ): Promise<ChangesOrderStatusResponse>;
}

export namespace ChangeOrderStatusParams {
  export type params = {
    stauts: OrderStatus;
    uuid: string;
  };
}
