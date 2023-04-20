import {FetchOffers, FetchOffersParams} from '../../domain/usages/FetchOffers';
import {OffersResponse} from '../../models/interfaces/OffersResponse';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpGetClient} from '../protocols/http/http-get-client';

export class RemoteFetchOffers implements FetchOffers {
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async fetch(params: FetchOffersParams.params): Promise<OffersResponse> {
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
