import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {QrCodeExpiryStatus} from '../../constants/QrCodeExpiryStatus';
import {Slices} from '../../constants/Slices';
import {ClientEntity} from '../../models/interfaces/ClientsListResponse';
import {PopupFunctions} from '../../components/GaNotification';

export type initialPopupState = {
  visible?: boolean;
  title: string;
  message: string;
  description?: string;
  onDismiss?: Function;
  onSubmit?: Function;
  type: 'success' | 'error' | 'danger' | 'plain';
  showDismiss?: boolean;
  showHeader?: boolean;
  buttonText?: string;
  onOutSideClick?: Function;
  closeOnOutsideClick?: boolean;
  popupFunction?: PopupFunctions;
};

export interface AppSliceState {
  route: number;
  isFirstTime: boolean;
  isQrCodeExpired?: QrCodeExpiryStatus;
  qrCodeData?: string;
  qrExpiry: number;
  openQrCode: boolean;
  qrLoading: boolean;
  organisations?: ClientEntity[];
  trigger: boolean;
  popup: initialPopupState;
  refresh: boolean;
  qrMessage: string;
  generateQrCode: boolean;
  routeNames: {
    BrandsScreen: string;
  };
}

const initialState: AppSliceState = {
  route: 0,
  isFirstTime: true,
  qrCodeData: '',
  openQrCode: false,
  organisations: [],
  qrExpiry: 0,
  trigger: false,
  popup: {} as initialPopupState,
  refresh: false,
  qrLoading: false,
  qrMessage: '',
  generateQrCode: false,
  routeNames: {
    BrandsScreen: 'Brands',
  },
};

export const appSlice = createSlice({
  name: Slices.app,
  initialState,
  reducers: {
    changeNavigatorRoute: (state, action: PayloadAction<number>) => {
      state.route = action.payload;
      state.isFirstTime = false;
    },

    clearAppSlice: () => initialState,

    setQrCodeData: (state, action: PayloadAction<string>) => {
      state.qrCodeData = action.payload;
    },

    setOpenQrCode: (state, action: PayloadAction<boolean>) => {
      state.openQrCode = action.payload;
    },

    setOrganisations: (state, action: PayloadAction<ClientEntity[]>) => {
      state.organisations = action.payload;
    },

    setQrExpiryDate: (state, action: PayloadAction<number>) => {
      state.qrExpiry = action.payload;
    },

    triggerQrCode: (state, action: PayloadAction<boolean>) => {
      state.trigger = action.payload;
    },
    openPopup: (state, action: PayloadAction<initialPopupState>) => {
      state.popup = {...state.popup, ...action.payload, visible: true};
    },
    closePoup: state => {
      state.popup = {} as initialPopupState;
    },

    refresh: state => {
      state.refresh = !state.refresh;
    },
    setQrLoading: (state, action) => {
      state.qrLoading = action.payload;
    },
    setQrMessage: (state, action) => {
      state.qrMessage = action.payload;
    },
    setGenerateQrCode: (state, action) => {
      state.generateQrCode = action.payload;
    },
    setRouteName: (state, action) => {
      state.routeNames.BrandsScreen = action.payload;
    },
    resetState: state => {
      state = initialState;
    },
    setQrCodeLoading: (state, action) => {
      state.qrLoading = action.payload;
    },
  },
});

export const {
  setQrCodeLoading,
  changeNavigatorRoute,
  clearAppSlice,
  closePoup,
  openPopup,
  resetState,
  refresh,
  setGenerateQrCode,
  setOpenQrCode,
  setOrganisations,
  setQrCodeData,
  setQrExpiryDate,
  setQrLoading,
  setQrMessage,
  triggerQrCode,
  setRouteName,
} = appSlice.actions;

export default appSlice.reducer;
