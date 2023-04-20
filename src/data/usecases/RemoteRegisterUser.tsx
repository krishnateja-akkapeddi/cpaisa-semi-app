import {
  RegisterUser,
  RegisterUserParams,
} from '../../domain/usages/RegisterUser';
import {RegisteredUserResponse} from '../../models/interfaces/RegisteredUserResponse';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpPostClient} from '../protocols/http/http-post-client';

export class RemoteRegisterUser implements RegisterUser {
  constructor(
    private readonly url: string,
    private readonly reedemClient: HttpPostClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async register(
    params: RegisterUserParams.params,
  ): Promise<RegisteredUserResponse> {
    const httpResponse = await this.reedemClient.post({
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
