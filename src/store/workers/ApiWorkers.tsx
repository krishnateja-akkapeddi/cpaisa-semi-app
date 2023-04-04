import {AuthHeader} from '../../constants/Auth';
import {RemoteVerifyOtp} from '../../data/usecases/auth/RemoteVerifyOtp';
import {RemoteFetchClientsList} from '../../data/usecases/RemoteFetchClientsList';
import {RemoteFetchCouponPartners} from '../../data/usecases/RemoteFetchCouponPartners';
import {RemoteFetchFetchAuthorizedStockists} from '../../data/usecases/RemoteFetchFetchAuthorizedStockists';
import {RemoteFetchImages} from '../../data/usecases/RemoteFetchImages';
import {RemoteFetchInvoiceDetail} from '../../data/usecases/RemoteFetchInvoiceDetail';
import {RemoteFetchInvoiceList} from '../../data/usecases/RemoteFetchInvoiceList';
import {RemoteFetchInvoiceSumary} from '../../data/usecases/RemoteFetchInvoiceSumary';
import {RemoteFetchNotifications} from '../../data/usecases/RemoteFetchNotifications';
import {RemoteFetchOffers} from '../../data/usecases/RemoteFetchOffers';
import {RemoteFetchOffersList} from '../../data/usecases/RemoteFetchOffersList';
import {RemoteFetchRewardRequestList} from '../../data/usecases/RemoteFetchRewardRequestList';
import {RemoteFetchWalletSumary} from '../../data/usecases/RemoteFetchWalletSummary';
import {RemoteGenerateOtp} from '../../data/usecases/RemoteGenerateOtp';
import {RemoteGenerateQrCode} from '../../data/usecases/RemoteGenerateQr';
import {RemoteReedemReward} from '../../data/usecases/RemoteReedemReward';
import {RemoteUpdateContact} from '../../data/usecases/RemoteUpdateContact';
import {RemoteUploadInvoice} from '../../data/usecases/RemoteUploadInvoice';
import ApiEndpoints from '../../domain/ApiEndpoints';
import {AxiosHttpClient} from '../../infra/http/axios-http-client';
import SharedPreference, {kSharedKeys} from '../../storage/SharedPreference';

const authClient = AxiosHttpClient.getInstance();
export const apiClient = AxiosHttpClient.getInstance();

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
}

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
};
