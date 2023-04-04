import {ErrorEntity} from './ErrorEntity';

export interface ReedemRewardResponse {
  success: boolean;
  reward_request: RewardRequest;
  errors?: ErrorEntity;
}

export interface RewardRequest {
  organization_id: string;
  reward_id: string;
  channel_partner_id: number;
  points: string;
  reference_number: string;
  is_gorupi_voucher: number;
  email_verified: number;
  created_at: string;
  id: number;
}
