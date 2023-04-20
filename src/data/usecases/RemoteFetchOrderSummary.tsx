import {
  FetchOrderStatus,
  FetchOrderStatusParams,
} from '../../domain/usages/FetchOrderStatus';
import {
  FetchOrderSummary,
  FetchOrderSummaryParams,
} from '../../domain/usages/FetchOrderSummary';
import {OrderStatusResponse} from '../../models/interfaces/OrderStatusResponse';
import {OrderSummaryResponse} from '../../models/interfaces/OrderSummaryResponse';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpGetClient} from '../protocols/http/http-get-client';

export class RemoteFetchOrderSummary implements FetchOrderSummary {
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.ORDER_SERVICE_BASE_URL;
  async fetch(
    params: FetchOrderSummaryParams.params,
  ): Promise<OrderSummaryResponse> {
    const httpResponse = await this.get.get({
      url: `${this.baseUrl}${this.url}`,
      query: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });
    console.log('THIS_OR', this.baseUrl);

    return httpResponse?.data;
  }
}
