import {
  FetchAuthorizedStockists,
  FetchAuthorizedStockistsParams,
} from '../../domain/usages/FetchAuthorizedStockists';
import {AuthorizedStockistsResponse} from '../../models/interfaces/AuthorizedStockistsResponse';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpGetClient} from '../protocols/http/http-get-client';

export class RemoteFetchFetchAuthorizedStockists
  implements FetchAuthorizedStockists
{
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async fetch(
    page: number,
    params: FetchAuthorizedStockistsParams.params,
  ): Promise<AuthorizedStockistsResponse> {
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
