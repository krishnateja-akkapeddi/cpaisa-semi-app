import {ErrorEntity} from './ErrorEntity';

export interface ClientListResponse {
  success: boolean;
  clients: Clients;
  errors?: ErrorEntity;
}

export interface Clients {
  current_page: number;
  data: ClientEntity[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface ClientEntity {
  id: number;
  name: string;
  short_code: string;
  state: string;
  status: string;
  description: any;
  website_link: string;
  logo_link: string;
}
