import {ClientListResponse} from '../../models/interfaces/ClientsListResponse';

export interface FetchClientsList {
  fetch(params: ClientListParams.params): Promise<ClientListResponse>;
}

export namespace ClientListParams {
  export type params = {
    mapped_organization?: 1 | 0;
    q?: string;
    short_code?: string;
    page?: string;
    state?: string;
  };
}
