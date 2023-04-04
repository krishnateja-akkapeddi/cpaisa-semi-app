import {
  ReedemReward,
  ReedemRewardParams,
} from '../../domain/usages/ReedemReward';
import {ReedemRewardResponse} from '../../models/interfaces/ReedemReward';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpGetClient} from '../protocols/http/http-get-client';
import {HttpPostClient} from '../protocols/http/http-post-client';

export class RemoteReedemReward implements ReedemReward {
  constructor(
    private readonly url: string,
    private readonly reedemClient: HttpPostClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async reedem(
    params: ReedemRewardParams.params,
  ): Promise<ReedemRewardResponse> {
    const httpResponse = await this.reedemClient.post({
      url: `${this.baseUrl}${this.url}`,
      body: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    return httpResponse.data;
  }
}
