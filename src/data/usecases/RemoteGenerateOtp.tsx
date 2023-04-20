import {GenerateOtp, GenerateOtpParams} from '../../domain/usages/GenerateOtp';
import {GenerateOtpResponse} from '../../models/interfaces/GenerateOtpResponse';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpPostClient} from '../protocols/http/http-post-client';

export class RemoteGenerateOtp implements GenerateOtp {
  constructor(
    private readonly url: string,
    private readonly post: HttpPostClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async generate(
    params: GenerateOtpParams.params,
  ): Promise<GenerateOtpResponse> {
    const httpResponse = await this.post.post({
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
