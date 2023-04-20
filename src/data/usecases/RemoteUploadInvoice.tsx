import {
  UploadInvoice,
  UploadInvoiceParams,
} from '../../domain/usages/UploadInvoice';
import ENV from '../../network/Env';
import {HttpConstants} from '../protocols/http/http-constants';
import {HttpPostClient} from '../protocols/http/http-post-client';

export class RemoteUploadInvoice implements UploadInvoice {
  constructor(
    private readonly url: string,
    private readonly post: HttpPostClient,
  ) {}
  private baseUrl = ENV.BASE_URL;

  async upload(params: FormData) {
    const httpResponse = await this.post.post({
      url: `${this.baseUrl}${this.url}`,
      body: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.MULTIPART_FORM_DATA,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    return httpResponse.data;
  }
}
