import {AsyncThunk, createAsyncThunk} from '@reduxjs/toolkit';
import {SaveDeviceInfoParams} from '../../domain/usages/SaveDeviceInfo';
import {VerifyOtpParams} from '../../domain/usages/VerifyOtp';
import {AuthResult} from '../../models/interfaces/AuthResponse';
import {SaveDeviceInfoResponse} from '../../models/interfaces/SaveDeviceInfoResponse';
import {FetchOrderSummaryParams} from '../../domain/usages/FetchOrderSummary';
import {OrderSummaryResponse} from '../../models/interfaces/OrderSummaryResponse';

export interface Api {
  saveDeviceInfo(
    params: SaveDeviceInfoParams.params,
  ): AsyncThunk<SaveDeviceInfoResponse, SaveDeviceInfoParams.params, {}>;
  fetchOrderSummary(
    params: FetchOrderSummaryParams.params,
  ): AsyncThunk<OrderSummaryResponse, FetchOrderSummaryParams.params, {}>;
}
