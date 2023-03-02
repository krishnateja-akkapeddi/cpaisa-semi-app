import {OffersResponse} from '../../models/interfaces/OffersResponse';

export interface FetchOffers {
  fetch(params: FetchOffersParams.params): Promise<OffersResponse>;
}

export namespace FetchOffersParams {
  export type params = {
    month_year?: number;
  };
}
