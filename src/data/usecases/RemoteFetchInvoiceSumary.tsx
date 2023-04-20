import {
  FetchInvcoiceSummary,
  FetchInvoiceSummaryParams,
} from '../../domain/usages/FetchInvoiceSummary';
import {InvoiceSummaryResponse} from '../../models/interfaces/InvoiceSummaryResponse';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpGetClient} from '../protocols/http/http-get-client';

export class RemoteFetchInvoiceSumary implements FetchInvcoiceSummary {
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async fetch(
    params: FetchInvoiceSummaryParams.params,
  ): Promise<InvoiceSummaryResponse> {
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
