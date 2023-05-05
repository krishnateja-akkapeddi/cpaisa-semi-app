import {ErrorEntity} from './ErrorEntity';

export interface RewardRequestReponse {
  success: boolean;
  reward_transactions: RewardTransactions;
  errors?: ErrorEntity;
}

export interface RewardTransactions {
  current_page: number;
  data: RewardTransactionEntity[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface RewardTransactionEntity {
  reward_request_no: number;
  status: string;
  request_raised_on: string;
  request_processing: string;
  generated_on?: string;
  points: number;
  organization_name: string;
  gorupi_link: string;
  coupon_partner: string;
  expiry_date?: string;
  tax_amount: string;
  tax_percentage: string;
  net_amount: number;
}
