import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Slices} from '../../constants/Slices';
import {AuthResult, Data} from '../../models/interfaces/AuthResponse';
import {OptionRegisterParams} from '../../domain/usages/RegisterUser';

const initialState: {
  authResult: AuthResult;
  registrationInfo: OptionRegisterParams;
} = {
  authResult: {} as AuthResult,
  registrationInfo: {} as OptionRegisterParams,
};

export const authSlice = createSlice({
  name: Slices.auth,
  initialState,
  reducers: {
    clearAuthSlice: () => initialState,
    storeAuthResult: (state, action: PayloadAction<AuthResult>) => {
      state.authResult = action.payload;
    },
    setRegistrationInfo: (
      state,
      action: PayloadAction<OptionRegisterParams>,
    ) => {
      state.registrationInfo = {...state.registrationInfo, ...action.payload};
    },
  },
});

export const {clearAuthSlice, setRegistrationInfo} = authSlice.actions;
export default authSlice.reducer;
