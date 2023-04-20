import {VerifyOtp, VerifyOtpParams} from '../../../domain/usages/VerifyOtp';
import {AuthResult} from '../../../models/interfaces/AuthResponse';
import ENV from '../../../network/Env';
import {HttpConstants} from '../../protocols/http/http-constants';
import {HttpPostClient} from '../../protocols/http/http-post-client';

export class RemoteVerifyOtp implements VerifyOtp {
  constructor(
    private readonly url: string,
    private readonly verifyOtp: HttpPostClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async verify(params: VerifyOtpParams.params): Promise<AuthResult> {
    const httpResponse = await this.verifyOtp.post({
      url: `${this.baseUrl}${this.url}`,
      body: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: false,
    });

    return httpResponse.data;
  }
}
