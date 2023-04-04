import {WalletSummaryResponse} from '../../models/interfaces/WalletSummary';
export interface FetchWalletSummary {
  fetch(
    params: FetchWalletSummaryParams.params,
  ): Promise<WalletSummaryResponse>;
}

export namespace FetchWalletSummaryParams {
  export type params = {
    client_id?: number;
  };
}
