import {
  FetchOrderStatus,
  FetchOrderStatusParams,
} from '../../domain/usages/FetchOrderStatus';
import {OrderStatusResponse} from '../../models/interfaces/OrderStatusResponse';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpGetClient} from '../protocols/http/http-get-client';

export class RemoteFetchOrderStatus implements FetchOrderStatus {
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async fetch(
    params: FetchOrderStatusParams.params,
  ): Promise<OrderStatusResponse> {
    const httpResponse = await this.get.get({
      url: `${this.baseUrl}${this.url
        .replace(':orderId', params.orderId.toString())
        .replace(':subOrderId', params.subOrderId.toString())}`,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    return httpResponse.data;
  }
}
