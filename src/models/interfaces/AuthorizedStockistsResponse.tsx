export interface AuthorizedStockistsResponse {
  success: boolean;
  stockists: Stockists;
}

export interface Stockists {
  data: StockistEntity[];
  current_page: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  total_pages: number;
}

export interface StockistEntity {
  firm_name: string;
  gst_number: string;
  organizations: StockistOrganizationEntity[];
  contacts: StockistContactEntity[];
}

export interface StockistOrganizationEntity {
  name: string;
}

export interface StockistContactEntity {
  type: string;
  value: string;
}
