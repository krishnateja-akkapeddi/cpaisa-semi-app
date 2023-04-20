import {BrandOffersResponse} from '../../models/interfaces/BrandOffersResponse';

export interface FetchBrandOffers {
  fetch(
    page: number,
    params: FetchBrandOffersParams.params,
  ): Promise<BrandOffersResponse>;
}

export namespace FetchBrandOffersParams {
  export type params = {
    month_year: string;
    client_id?: number;
    with_contact_person?: number;
  };
}
