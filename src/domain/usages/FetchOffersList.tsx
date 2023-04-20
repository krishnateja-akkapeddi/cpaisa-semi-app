import {OfferListResponse} from '../../models/interfaces/OffersListResponse';

export interface FetchOffersList {
  fetch(params: FetchOffersListParams.params): Promise<OfferListResponse>;
}

export namespace FetchOffersListParams {
  export type params = {
    client_id?: number;
    q?: string;
    page: number;
  };
}
