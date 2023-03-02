import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {QrCodeExpiryStatus} from '../../constants/QrCodeExpiryStatus';
import {Slices} from '../../constants/Slices';
import {ClientEntity} from '../../models/interfaces/ClientsListResponse';

export interface AppSliceState {
  route: number;
  isFirstTime: boolean;
  isQrCodeExpired?: QrCodeExpiryStatus;
  qrCodeData?: string;
  qrExpiry: number;
  openQrCode: boolean;
  organisations?: ClientEntity[];
}

const initialState: AppSliceState = {
  route: 0,
  isFirstTime: true,
  isQrCodeExpired: QrCodeExpiryStatus.DEFAULT,
  qrCodeData: '',
  openQrCode: false,
  organisations: [],
  qrExpiry: 0,
};

export const appSlice = createSlice({
  name: Slices.app,
  initialState,
  reducers: {
    changeNavigatorRoute: (state, action: PayloadAction<number>) => {
      state.route = action.payload;
      state.isFirstTime = false;
    },

    setIsQrCodeExpired: (state, action: PayloadAction<QrCodeExpiryStatus>) => {
      state.isQrCodeExpired = action.payload;
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
  },
});

export const {changeNavigatorRoute, clearAppSlice, setIsQrCodeExpired} =
  appSlice.actions;
export default appSlice.reducer;
