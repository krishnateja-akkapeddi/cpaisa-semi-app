import {FetchInvcoiceDetail} from '../../domain/usages/FetchInvoiceDetail';
import {InvoiceDetailResponse} from '../../models/interfaces/InvoiceDetailResponse';
import {InvoiceListResponse} from '../../models/interfaces/InvoiceListResponse';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpGetClient} from '../protocols/http/http-get-client';

export class RemoteFetchInvoiceDetail implements FetchInvcoiceDetail {
  constructor(
    private readonly url: string,
    private readonly get: HttpGetClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async fetch(id: string): Promise<InvoiceDetailResponse> {
    const httpResponse = await this.get.get({
      url: `${this.baseUrl}${this.url.replace(':id', id)}`,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    return httpResponse.data;
  }
}
