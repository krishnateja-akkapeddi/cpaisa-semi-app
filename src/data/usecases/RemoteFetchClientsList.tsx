import {HttpGetClient} from '../protocols/http/http-get-client';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {
  FetchClientsList,
  ClientListParams,
} from '../../domain/usages/FetchClientsList';
import {ClientListResponse} from '../../models/interfaces/ClientsListResponse';

export class RemoteFetchClientsList implements FetchClientsList {
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async fetch(params: ClientListParams.params): Promise<ClientListResponse> {
    const httpResponse = await this.get.get({
      url: `${this.baseUrl}${this.url}`,
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
