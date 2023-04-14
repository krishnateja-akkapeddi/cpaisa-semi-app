import {IdenitifcationType} from '../../models/enum/IdentificationType';

export interface FetchIdentity {
  fetch<T>(params: FetchIdentityParams.params): Promise<T>;
}

export namespace FetchIdentityParams {
  export type params = {
    identityType: IdenitifcationType;
    value: string;
  };
}
