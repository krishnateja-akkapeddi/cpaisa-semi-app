import {FetchSliderImages} from '../../domain/usages/FetchSliderImages';
import {HttpGetClient} from '../protocols/http/http-get-client';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {SliderImagesResponse} from '../../models/interfaces/SliderImagesResponse';

export class RemoteFetchImages implements FetchSliderImages {
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async fetch(): Promise<SliderImagesResponse> {
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
