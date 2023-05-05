import {SaveDeviceInfoResponse} from '../../models/interfaces/SaveDeviceInfoResponse';

export interface SaveDeviceInfo {
  save(body: SaveDeviceInfoParams.params): Promise<SaveDeviceInfoResponse>;
}

export namespace SaveDeviceInfoParams {
  export type params = {
    token: string;
    os: string;
    device: string;
    app_version: string;
  };
}
