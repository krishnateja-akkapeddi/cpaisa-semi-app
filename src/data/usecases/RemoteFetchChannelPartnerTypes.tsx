import {HttpGetClient} from '../protocols/http/http-get-client';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {FetchChannelPartnerTypes} from '../../domain/usages/FetchChannelPartnerType';
import {ChannelPartnerTypesResponse} from '../../models/interfaces/ChannelPartnerTypeResponse';

export class RemoteFetchChannelPartnerTypes
  implements FetchChannelPartnerTypes
{
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async fetch(): Promise<ChannelPartnerTypesResponse> {
    const httpResponse = await this.get.get({
      url: `${this.baseUrl}${this.url}`,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    return httpResponse.data;
  }
}
