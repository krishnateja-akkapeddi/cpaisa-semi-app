import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit';
import {fetchInvoiceSummary, generateQrCode} from '../thunks/ApiThunks';

export interface ApiSliceState {
  fetchingInvoicesLoading: boolean;
  fetchingQRCode: boolean;
}

const initialState: ApiSliceState = {
  fetchingInvoicesLoading: false,
  fetchingQRCode: false,
};

export const apiSlice = createSlice({
  name: 'channelpaisa_api',
  initialState,
  reducers: {
    resetStore: () => initialState,
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
  },
});

export default apiSlice.reducer;
