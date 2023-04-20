export interface GenerateOtpResponse {
  success: boolean;
  otp: string;
  errors?: {
    mobile: string;
    mode: string;
  };
}
