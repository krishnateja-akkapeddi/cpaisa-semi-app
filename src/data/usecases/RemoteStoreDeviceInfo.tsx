import {
  SaveDeviceInfo,
  SaveDeviceInfoParams,
} from '../../domain/usages/SaveDeviceInfo';
import {SaveDeviceInfoResponse} from '../../models/interfaces/SaveDeviceInfoResponse';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpPostClient} from '../protocols/http/http-post-client';

export class RemoteStoreDeviceInfo implements SaveDeviceInfo {
  constructor(
    private readonly url: string,
    private readonly reedemClient: HttpPostClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async save(
    params: SaveDeviceInfoParams.params,
  ): Promise<SaveDeviceInfoResponse> {
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
