import {AuthHeader} from '../../constants/Auth';
import {RemoteVerifyOtp} from '../../data/usecases/auth/RemoteVerifyOtp';
import {RemoteChangeOrderStatus} from '../../data/usecases/RemoteChangeOrderStatus';
import {RemoteFetchBrandOffers} from '../../data/usecases/RemoteFetchBrandOffers';
import {RemoteFetchChannelPartnerTypes} from '../../data/usecases/RemoteFetchChannelPartnerTypes';
import {RemoteFetchClientsList} from '../../data/usecases/RemoteFetchClientsList';
import {RemoteFetchCouponPartners} from '../../data/usecases/RemoteFetchCouponPartners';
import {RemoteFetchDivisions} from '../../data/usecases/RemoteFetchDivisions';
import {RemoteFetchFetchAuthorizedStockists} from '../../data/usecases/RemoteFetchFetchAuthorizedStockists';
import {RemoteFetchIdentity} from '../../data/usecases/RemoteFetchIdentity';
import {RemoteFetchImages} from '../../data/usecases/RemoteFetchImages';
import {RemoteFetchInvoiceDetail} from '../../data/usecases/RemoteFetchInvoiceDetail';
import {RemoteFetchInvoiceList} from '../../data/usecases/RemoteFetchInvoiceList';
import {RemoteFetchInvoiceSumary} from '../../data/usecases/RemoteFetchInvoiceSumary';
import {RemoteFetchNotifications} from '../../data/usecases/RemoteFetchNotifications';
import {RemoteFetchOffers} from '../../data/usecases/RemoteFetchOffers';
import {RemoteFetchOffersList} from '../../data/usecases/RemoteFetchOffersList';
import {RemoteFetchOrdersList} from '../../data/usecases/RemoteFetchOrdersList';
import {RemoteFetchOrdersServiceList} from '../../data/usecases/RemoteFetchOrdersServiceList';
import {RemoteFetchOrderStatus} from '../../data/usecases/RemoteFetchOrderStatus';
import {RemoteFetchOrderSummary} from '../../data/usecases/RemoteFetchOrderSummary';
import {RemoteFetchRewardRequestList} from '../../data/usecases/RemoteFetchRewardRequestList';
import {RemoteFetchWalletSumary} from '../../data/usecases/RemoteFetchWalletSummary';
import {RemoteGenerateOtp} from '../../data/usecases/RemoteGenerateOtp';
import {RemoteGenerateQrCode} from '../../data/usecases/RemoteGenerateQr';
import {RemoteReedemReward} from '../../data/usecases/RemoteReedemReward';
import {RemoteRegisterUser} from '../../data/usecases/RemoteRegisterUser';
import {RemoteUpdateContact} from '../../data/usecases/RemoteUpdateContact';
import {RemoteUploadInvoice} from '../../data/usecases/RemoteUploadInvoice';
import ApiEndpoints from '../../domain/ApiEndpoints';
import {FetchOrdersList} from '../../domain/usages/FetchOrdersList';
import {AxiosHttpClient} from '../../infra/http/axios-http-client';
import ENV from '../../network/Env';
import SharedPreference, {kSharedKeys} from '../../storage/SharedPreference';

const authClient = AxiosHttpClient.getInstance();
export const apiClient = AxiosHttpClient.getInstance();
export const ordersApiClient = new AxiosHttpClient();
export class ApiWorkers {
  token: string;
  instance: ApiWorkers | null = null;

  constructor(token: string) {
    if (this.instance) {
      throw new Error('Only one instance allowed');
    }
    this.token = token;
    this.instance = this;
    if (!this.instance) {
      this.instance = this;
    }
  }
  getInstance() {
    return this.instance;
  }
}

export async function setClientHeaders() {
  const rawAuthToken: any = await SharedPreference.shared.getItem(
    kSharedKeys.authToken,
  );
  const authToken = rawAuthToken;
  apiClient.setAuthHeaders({
    [AuthHeader.AUTH]: authToken,
  });

  ordersApiClient.setAuthHeaders({
    [AuthHeader.ORDER_SERVICE]: ENV.ORDER_SERVICE_TOKEN,
  });
}
console.log('API_CL', apiClient, ordersApiClient);

setClientHeaders();

const verifyOtpWorker = new RemoteVerifyOtp(
  ApiEndpoints.VERIFY_OTP,
  authClient,
);

const fetchSliderImagesWorker = new RemoteFetchImages(
  ApiEndpoints.FETCH_IMAGES,
  apiClient,
);

const fetchInvoiceSummaryWorker = new RemoteFetchInvoiceSumary(
  ApiEndpoints.FETCH_INVOICE_SUMMARY,
  apiClient,
);

const fetchOffersWorker = new RemoteFetchOffers(ApiEndpoints.OFFERS, apiClient);

const generateQrCodeWorker = new RemoteGenerateQrCode(
  ApiEndpoints.QR_CODE_GENERATOR,
  apiClient,
);

const fetchWalletSummaryWorker = new RemoteFetchWalletSumary(
  ApiEndpoints.FETCH_WALLET_SUMMARY,
  apiClient,
);

const fetchInvoiceListWorker = new RemoteFetchInvoiceList(
  ApiEndpoints.FETCH_INVOICE_LIST,
  apiClient,
);

const fetchInvoiceDetailWorker = new RemoteFetchInvoiceDetail(
  ApiEndpoints.FETCH_INVOICE_DETAIL,
  apiClient,
);

const updateContactInfoWorker = new RemoteUpdateContact(
  ApiEndpoints.UPDATE_CONTACT,
  apiClient,
);

const fetchClientsListWorker = new RemoteFetchClientsList(
  ApiEndpoints.CLIENTS,
  apiClient,
);

const FetchRewardRequestListWorker = new RemoteFetchRewardRequestList(
  ApiEndpoints.REWARD_REQUESTS,
  apiClient,
);

const uploadInvoiceWorker = new RemoteUploadInvoice(
  ApiEndpoints.UPLOAD_INVOICE,
  apiClient,
);

const fetchOffersListWorker = new RemoteFetchOffersList(
  ApiEndpoints.OFFERS_LIST,
  apiClient,
);

const generateOtpWorker = new RemoteGenerateOtp(
  ApiEndpoints.GENERATE_OTP,
  apiClient,
);

const reedemRewardWorker = new RemoteReedemReward(
  ApiEndpoints.REDEEM_REQUEST,
  apiClient,
);

const fetchCouponPartnersWorker = new RemoteFetchCouponPartners(
  ApiEndpoints.COUPON_PARTNERS,
  apiClient,
);

const fetchAuthorizedStockistsWorker = new RemoteFetchFetchAuthorizedStockists(
  ApiEndpoints.AUTHORIZED_STOCKISTS,
  apiClient,
);

const fetchNotificationsWorker = new RemoteFetchNotifications(
  ApiEndpoints.NOTIFICATIONS,
  apiClient,
);

const fetchOrdersWorker: FetchOrdersList = new RemoteFetchOrdersList(
  ApiEndpoints.ORDERS,
  apiClient,
);

const fetchOrdersServiceWorker = new RemoteFetchOrdersServiceList(
  ApiEndpoints.ORDER_SERVICE,
  apiClient,
);

const changeOrderStatusWorker = new RemoteChangeOrderStatus(
  ApiEndpoints.CHANGE_ORDER_STATUS,
  apiClient,
);

const fetchOrderStatusWorker = new RemoteFetchOrderStatus(
  ApiEndpoints.TRACK_ORDER,
  apiClient,
);

const fetchBrandOffersWorker = new RemoteFetchBrandOffers(
  ApiEndpoints.OFFERS,
  apiClient,
);

const fetchIdentityWorker = new RemoteFetchIdentity(
  ApiEndpoints.FETCH_IDENTITY,
  apiClient,
);

const fetchChannelPartnerTypesWorker = new RemoteFetchChannelPartnerTypes(
  ApiEndpoints.CHANNEL_PARTNER_TYPES,
  apiClient,
);

const fetchDivisionsWorker = new RemoteFetchDivisions(
  ApiEndpoints.FETCH_DIVISIONS,
  apiClient,
);

const registerUserWorker = new RemoteRegisterUser(
  ApiEndpoints.REGISTER_USER,
  apiClient,
);

const fetchOrderSummaryWorker = new RemoteFetchOrderSummary(
  ApiEndpoints.ORDERS_SUMMARY,
  ordersApiClient,
);

export {
  fetchInvoiceSummaryWorker,
  fetchOffersWorker,
  fetchSliderImagesWorker,
  fetchWalletSummaryWorker,
  generateQrCodeWorker,
  verifyOtpWorker,
  fetchInvoiceListWorker,
  fetchInvoiceDetailWorker,
  updateContactInfoWorker,
  fetchClientsListWorker,
  FetchRewardRequestListWorker,
  uploadInvoiceWorker,
  fetchOffersListWorker,
  fetchAuthorizedStockistsWorker,
  generateOtpWorker,
  reedemRewardWorker,
  fetchCouponPartnersWorker,
  fetchNotificationsWorker,
  fetchOrdersWorker,
  changeOrderStatusWorker,
  fetchOrdersServiceWorker,
  fetchOrderStatusWorker,
  fetchBrandOffersWorker,
  fetchIdentityWorker,
  fetchChannelPartnerTypesWorker,
  fetchDivisionsWorker,
  registerUserWorker,
  fetchOrderSummaryWorker,
};
