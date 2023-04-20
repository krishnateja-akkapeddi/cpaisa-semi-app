import {
  FetchOrdersList,
  FetchOrdersListParams,
  FetchOrdersServiceList,
} from '../../domain/usages/FetchOrdersList';
import {OrdersServiceResponse} from '../../models/interfaces/OrderServiceResponse';
import {OrdersListResponse} from '../../models/interfaces/OrdersListResponse';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpGetClient} from '../protocols/http/http-get-client';

export class RemoteFetchOrdersServiceList implements FetchOrdersServiceList {
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async fetch(
    page: number,
    params: FetchOrdersListParams.params,
  ): Promise<OrdersServiceResponse> {
    const httpResponse = await this.get.get({
      url: `${this.baseUrl}${this.url.replace(':pageNumber', page.toString())}`,
      query: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    return httpResponse.data;
  }
}
