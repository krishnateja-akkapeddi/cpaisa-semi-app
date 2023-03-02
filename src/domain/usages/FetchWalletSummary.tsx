import {WalletSummaryResponse} from '../../models/interfaces/WalletSummary';
export interface FetchWalletSummary {
  fetch(): Promise<WalletSummaryResponse>;
}
