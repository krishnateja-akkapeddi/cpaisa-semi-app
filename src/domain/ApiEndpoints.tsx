const ApiEndpoints = {
  VERIFY_OTP: '/auth/verify-otp',
  WALLET_INFO: '/wallet',
  QR_CODE_GENERATOR: '/qr-code',
  FETCH_IMAGES: '/slider-images',
  FETCH_WALLET_SUMMARY: '/wallets/summery',
  FETCH_INVOICE_SUMMARY: '/invoices/summary',
  OFFERS: '/offers',
  FETCH_INVOICE_LIST: '/invoices?page=:pageNumber',
  FETCH_INVOICE_DETAIL: '/invoices/:id/details',
  UPDATE_CONTACT: '/contacts',
  CLIENTS: '/clients',
  REWARD_REQUESTS: '/reward-requests/transactions?page=:pageNumber',
  UPLOAD_INVOICE: '/invoices',
  OFFERS_LIST: '/products/offers',
  GENERATE_OTP: '/otp/generate',
  REDEEM_REQUEST: '/reward-requests',
  COUPON_PARTNERS: '/rewards/forOrganization/:id',
  AUTHORIZED_STOCKISTS: '/channel-partners/stockist?page=:pageNumber',
  NOTIFICATIONS: '/notifications',
};

export default ApiEndpoints;
