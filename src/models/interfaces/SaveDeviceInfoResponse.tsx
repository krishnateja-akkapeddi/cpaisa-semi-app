export interface SaveDeviceInfoResponse {
  success: boolean;
  device: Device;
}

export interface Device {
  id: number;
  os: string;
  device: string;
  token: string;
  app_version: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}
