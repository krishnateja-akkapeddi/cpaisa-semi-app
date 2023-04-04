import {AuthorizedStockistsResponse} from '../../models/interfaces/AuthorizedStockistsResponse';

export interface FetchAuthorizedStockists {
  fetch(
    page: number,
    params: FetchAuthorizedStockistsParams.params,
  ): Promise<AuthorizedStockistsResponse>;
}

export namespace FetchAuthorizedStockistsParams {
  export type params = {
    client_code?: string;
    q?: string;
    length?: number;
  };
}
