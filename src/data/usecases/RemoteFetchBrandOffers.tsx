import {HttpGetClient} from '../protocols/http/http-get-client';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {
  FetchBrandOffers,
  FetchBrandOffersParams,
} from '../../domain/usages/FetchBrandOffers';
import {BrandOffersResponse} from '../../models/interfaces/BrandOffersResponse';

export class RemoteFetchBrandOffers implements FetchBrandOffers {
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async fetch(
    page: number,
    params: FetchBrandOffersParams.params,
  ): Promise<BrandOffersResponse> {
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
