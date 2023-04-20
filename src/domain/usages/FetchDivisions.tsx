import {FetchDivisionsResponse} from '../../models/interfaces/FetchDivisionsResponse';

export interface FetchDivisions {
  fetch(): Promise<FetchDivisionsResponse>;
}

// ? Convert.toTitleCase(shopName) :
