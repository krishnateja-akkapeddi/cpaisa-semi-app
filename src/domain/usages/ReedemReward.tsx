import {ReedemRewardResponse} from '../../models/interfaces/ReedemReward';
export interface ReedemReward {
  reedem(body: ReedemRewardParams.params): Promise<ReedemRewardResponse>;
}

export namespace ReedemRewardParams {
  export type params = {
    reward_id: string;
    points: string;
    team_id: string;
    organization_id: string;
  };
}
