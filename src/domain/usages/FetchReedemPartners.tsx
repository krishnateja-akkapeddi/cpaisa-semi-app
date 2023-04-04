import {CouponPartnersResponse} from '../../models/interfaces/ReemPartnersResponse';

export interface FetchCouponPartners {
  fetch(
    params: FetchCouponPartnersParams.params,
  ): Promise<CouponPartnersResponse>;
}

export namespace FetchCouponPartnersParams {
  export type params = {
    id: number;
  };
}
