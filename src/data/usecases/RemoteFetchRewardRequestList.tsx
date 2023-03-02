import {
  FetchRewardRequestList,
  FetchRewardRequestListParams,
} from '../../domain/usages/FetchRewardRequestList';
import {RewardRequestReponse} from '../../models/interfaces/RewardRequestResponse';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpGetClient} from '../protocols/http/http-get-client';

export class RemoteFetchRewardRequestList implements FetchRewardRequestList {
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async fetch(
    params: FetchRewardRequestListParams.params,
    page: number,
  ): Promise<RewardRequestReponse> {
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
