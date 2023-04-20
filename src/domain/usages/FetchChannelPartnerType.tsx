import {ChannelPartnerTypesResponse} from '../../models/interfaces/ChannelPartnerTypeResponse';

export interface FetchChannelPartnerTypes {
  fetch(): Promise<ChannelPartnerTypesResponse>;
}
