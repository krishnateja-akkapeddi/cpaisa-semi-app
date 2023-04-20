export type QrCodeResponse = {
  qr_code: {
    success: boolean;
    image: string;
    expiry: string;
    message: string;
  };
};
