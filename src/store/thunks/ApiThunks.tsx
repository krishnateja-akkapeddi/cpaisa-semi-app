import {createAsyncThunk} from '@reduxjs/toolkit';
import {ClientListParams} from '../../domain/usages/FetchClientsList';
import {FetchInvoiceListParams} from '../../domain/usages/FetchInvoiceList';
import {FetchInvoiceSummaryParams} from '../../domain/usages/FetchInvoiceSummary';
import {FetchOffersParams} from '../../domain/usages/FetchOffers';
import {FetchOffersListParams} from '../../domain/usages/FetchOffersList';
import {FetchRewardRequestListParams} from '../../domain/usages/FetchRewardRequestList';
import {GenerateOtpParams} from '../../domain/usages/GenerateOtp';
import {GenerateQrCodeParams} from '../../domain/usages/GenerateQrCode';
import {UpdateContactParams} from '../../domain/usages/UpdateContact';
import {UploadInvoiceParams} from '../../domain/usages/UploadInvoice';
import {VerifyOtpParams} from '../../domain/usages/VerifyOtp';
import {AuthResult} from '../../models/interfaces/AuthResponse';
import {ClientListResponse} from '../../models/interfaces/ClientsListResponse';
import {GenerateOtpResponse} from '../../models/interfaces/GenerateOtpResponse';
import {InvoiceDetailResponse} from '../../models/interfaces/InvoiceDetailResponse';
import {InvoiceListResponse} from '../../models/interfaces/InvoiceListResponse';
import {InvoiceSummaryResponse} from '../../models/interfaces/InvoiceSummaryResponse';
import {InvoiceUploadResponse} from '../../models/interfaces/InvoiceUploadResponse';
import {OfferListResponse} from '../../models/interfaces/OffersListResponse';
import {QrCodeResponse} from '../../models/interfaces/QrCodeResponse';
import {RewardRequestReponse} from '../../models/interfaces/RewardRequestResponse';
import {UpdatedContactResponse} from '../../models/interfaces/UpdateContactResponse';
import {WalletSummaryResponse} from '../../models/interfaces/WalletSummary';
import SharedPreference, {kSharedKeys} from '../../storage/SharedPreference';
import {
  fetchClientsListWorker,
  fetchInvoiceDetailWorker,
  fetchInvoiceListWorker,
  fetchInvoiceSummaryWorker,
  fetchOffersWorker,
  FetchRewardRequestListWorker,
  fetchSliderImagesWorker,
  fetchWalletSummaryWorker,
  generateQrCodeWorker,
  updateContactInfoWorker,
  uploadInvoiceWorker,
  verifyOtpWorker,
  fetchOffersListWorker,
  generateOtpWorker,
} from '../workers/ApiWorkers';

const storage = SharedPreference.shared;

const verifyOtp = createAsyncThunk(
  'verifiying otp...',
  async (params: VerifyOtpParams.params): Promise<AuthResult> => {
    const data = await verifyOtpWorker.verify(params);
    if (data.success) {
      storage.setItem(kSharedKeys.userDetails, JSON.stringify(data.data));
      storage.setItem(kSharedKeys.authToken, data?.data.user.auth_token);
    }
    return data;
  },
);

const fetchInvoiceSummary = createAsyncThunk(
  'fetching invoices...',
  async (
    params: FetchInvoiceSummaryParams.params,
  ): Promise<InvoiceSummaryResponse> => {
    const data = await fetchInvoiceSummaryWorker.fetch(params);
    return data;
  },
);

const fetchSliderImages = createAsyncThunk(
  'fetching slider images...',
  async () => {
    const data = await fetchSliderImagesWorker.fetch();
    return data;
  },
);

const fetchOffers = createAsyncThunk(
  'fetching offers...',
  async (params: FetchOffersParams.params) => {
    const data = await fetchOffersWorker.fetch(params);
    return data;
  },
);

const generateQrCode = createAsyncThunk(
  'generating qr-code...',
  async (params: GenerateQrCodeParams.params): Promise<QrCodeResponse> => {
    const data = await generateQrCodeWorker.generate(params);
    return data;
  },
);

const fetchWalletSummary = createAsyncThunk(
  'fetching wallet-summarys...',
  async (): Promise<WalletSummaryResponse> => {
    const data = await fetchWalletSummaryWorker.fetch();
    return data;
  },
);

const fetchInvoiceList = createAsyncThunk(
  'fetching invoice-list...',
  async (params: {
    page: number;
    params: FetchInvoiceListParams.params;
  }): Promise<InvoiceListResponse> => {
    const data = await fetchInvoiceListWorker.fetch(params.page, params.params);
    return data;
  },
);

const fetchInvoiceDetail = createAsyncThunk(
  'fetching invoice-list...',
  async (params: string): Promise<InvoiceDetailResponse> => {
    const data = await fetchInvoiceDetailWorker.fetch(params);
    return data;
  },
);

const updateContactInfo = createAsyncThunk(
  'updating contacts...',
  async (
    params: UpdateContactParams.params,
  ): Promise<UpdatedContactResponse> => {
    const data = await updateContactInfoWorker.update(params);
    return data;
  },
);

const fetchClients = createAsyncThunk(
  'fetching clients...',
  async (params: ClientListParams.params): Promise<ClientListResponse> => {
    const data = await fetchClientsListWorker.fetch(params);
    return data;
  },
);

const fetchRewardRequestList = createAsyncThunk(
  'fetching reward requests...',
  async (args: {
    page: number;
    params: FetchRewardRequestListParams.params;
  }): Promise<RewardRequestReponse> => {
    const data = await FetchRewardRequestListWorker.fetch(
      args.params,
      args.page,
    );
    return data;
  },
);

const uploadInvoice = createAsyncThunk(
  'uploading invoice...',
  async (params: FormData): Promise<InvoiceUploadResponse> => {
    const data = await uploadInvoiceWorker.upload(params);
    return data;
  },
);

const fetchOffersList = createAsyncThunk(
  'fetching Offers...',
  async (params: FetchOffersListParams.params): Promise<OfferListResponse> => {
    const data = await fetchOffersListWorker.fetch(params);
    return data;
  },
);

const generateOtp = createAsyncThunk(
  'generating otp...',
  async (params: GenerateOtpParams.params): Promise<GenerateOtpResponse> => {
    const data = await generateOtpWorker.generate(params);
    return data;
  },
);

export {
  fetchInvoiceSummary,
  fetchWalletSummary,
  fetchSliderImages,
  fetchOffers,
  generateQrCode,
  verifyOtp,
  fetchInvoiceList,
  fetchInvoiceDetail,
  updateContactInfo,
  fetchClients,
  fetchRewardRequestList,
  uploadInvoice,
  fetchOffersList,
  generateOtp,
};
