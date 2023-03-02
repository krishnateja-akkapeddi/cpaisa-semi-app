import {
  UpdateContact,
  UpdateContactParams,
} from '../../domain/usages/UpdateContact';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpPutClient} from '../protocols/http/http-put-client';

export class RemoteUpdateContact implements UpdateContact {
  constructor(
    private readonly url: string,
    private readonly put: HttpPutClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async update(params?: UpdateContactParams.params) {
    const httpResponse = await this.put.put({
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
