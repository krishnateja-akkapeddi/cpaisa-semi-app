import {
  FetchCouponPartners,
  FetchCouponPartnersParams,
} from '../../domain/usages/FetchReedemPartners';
import {CouponPartnersResponse} from '../../models/interfaces/ReemPartnersResponse';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpGetClient} from '../protocols/http/http-get-client';

export class RemoteFetchCouponPartners implements FetchCouponPartners {
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL.replace('v4', 'v1');

  async fetch(
    params: FetchCouponPartnersParams.params,
  ): Promise<CouponPartnersResponse> {
    const httpResponse = await this.get.get({
      url: `${this.baseUrl}${this.url.replace(':id', params.id.toString())}`,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });
    return httpResponse.data;
  }
}
