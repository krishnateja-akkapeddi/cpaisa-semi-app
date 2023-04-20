export interface ChannelPartnerTypesResponse {
  success: boolean;
  channel_partner_types: ChannelPartnerTypeEntity[];
}

export interface ChannelPartnerTypeEntity {
  id: number;
  name: string;
  display_name: string;
  is_display_visible: number;
}
