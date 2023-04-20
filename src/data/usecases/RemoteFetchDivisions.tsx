import {HttpGetClient} from '../protocols/http/http-get-client';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {FetchDivisions} from '../../domain/usages/FetchDivisions';
import {FetchDivisionsResponse} from '../../models/interfaces/FetchDivisionsResponse';

export class RemoteFetchDivisions implements FetchDivisions {
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async fetch(): Promise<FetchDivisionsResponse> {
    const httpResponse = await this.get.get({
      url: `${this.baseUrl.replace('v4', 'v1')}${this.url}`,
      query: {status: 'active'},
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    return httpResponse.data;
  }
}
