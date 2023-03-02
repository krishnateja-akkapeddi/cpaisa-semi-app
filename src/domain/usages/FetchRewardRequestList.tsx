import {RewardRequestReponse} from '../../models/interfaces/RewardRequestResponse';

export interface FetchRewardRequestList {
  fetch(
    params: FetchRewardRequestListParams.params,
    page: number,
  ): Promise<RewardRequestReponse>;
}

export namespace FetchRewardRequestListParams {
  export type params = {
    length?: number;
    organization_id?: number;
    from_date?: string;
    to_date?: string;
    status?: 'approved' | 'processing';
    start_point?: number;
    end_point?: number;
    client_id?: number;
  };
}
