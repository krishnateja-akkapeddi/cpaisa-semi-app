import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit';
import {fetchInvoiceSummary, generateQrCode} from '../thunks/ApiThunks';
import InternetManager from '../../network/InternetManager';
import {ApiSliceState} from '../../models/interfaces/ApiStoreInterface';

const initialState: ApiSliceState = {
  fetchingInvoicesLoading: false,
  fetchingQRCode: false,
  internetAvailable: true,
  isApiCalled: false,
};

export const apiSlice = createSlice({
  name: 'channelpaisa_api',
  initialState,
  reducers: {
    resetStore: () => initialState,

    setIsInternetAvailable: (state, data) => {
      state.internetAvailable = data.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ApiSliceState>) => {
    //invoice summary
    builder.addCase(fetchInvoiceSummary.fulfilled, (state: ApiSliceState) => {
      state.fetchingInvoicesLoading = false;
    });
    builder.addCase(fetchInvoiceSummary.pending, state => {
      state.fetchingInvoicesLoading = true;
    });

    //qr code
    builder.addCase(generateQrCode.pending, state => {
      state.fetchingQRCode = true;
    });
    builder.addCase(generateQrCode.fulfilled, state => {
      state.fetchingQRCode = false;
    });
    builder.addDefaultCase(state => {
      state.isApiCalled = !state.isApiCalled;
    });
  },
});
export default apiSlice.reducer;
