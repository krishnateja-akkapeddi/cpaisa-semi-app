import {HttpGetClient} from '../protocols/http/http-get-client';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {FetchNotifications} from '../../domain/usages/FetchNotifications';
import {NotificationsResponse} from '../../models/interfaces/NotificationsResponse';

export class RemoteFetchNotifications implements FetchNotifications {
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async fetch(page: number): Promise<NotificationsResponse> {
    const httpResponse = await this.get.get({
      url: `${this.baseUrl}${this.url.replace(':pageNumber', page.toString())}`,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    return httpResponse.data;
  }
}
