import {
  FetchWalletSummary,
  FetchWalletSummaryParams,
} from '../../domain/usages/FetchWalletSummary';
import {WalletSummaryResponse} from '../../models/interfaces/WalletSummary';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpGetClient} from '../protocols/http/http-get-client';

export class RemoteFetchWalletSumary implements FetchWalletSummary {
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async fetch(
    params?: FetchWalletSummaryParams.params,
  ): Promise<WalletSummaryResponse> {
    const httpResponse = await this.get.get({
      url: `${this.baseUrl}${this.url}`,
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
