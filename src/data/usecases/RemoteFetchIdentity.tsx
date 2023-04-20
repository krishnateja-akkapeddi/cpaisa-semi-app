import {HttpGetClient} from '../protocols/http/http-get-client';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {
  FetchBrandOffers,
  FetchBrandOffersParams,
} from '../../domain/usages/FetchBrandOffers';
import {BrandOffersResponse} from '../../models/interfaces/BrandOffersResponse';
import {
  FetchIdentity,
  FetchIdentityParams,
} from '../../domain/usages/FetchIdentity';

export class RemoteFetchIdentity implements FetchIdentity {
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async fetch<T>(params: FetchIdentityParams.params): Promise<T> {
    const httpResponse = await this.get.get({
      url: `${this.baseUrl}${this.url
        .replace(':identityType', params.identityType)
        .replace(':value', params.value)}`,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: false,
    });

    return httpResponse.data;
  }
}
