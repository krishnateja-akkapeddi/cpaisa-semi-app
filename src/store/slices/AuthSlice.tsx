import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Slices} from '../../constants/Slices';
import {AuthResult, Data} from '../../models/interfaces/AuthResponse';

const initialState: {authResult: AuthResult} = {
  authResult: {} as AuthResult,
};

export const authSlice = createSlice({
  name: Slices.auth,
  initialState,
  reducers: {
    clearAuthSlice: () => initialState,
    storeAuthResult: (state, action: PayloadAction<AuthResult>) => {
      state.authResult = action.payload;
    },
  },
});

export const {clearAuthSlice} = authSlice.actions;
export default authSlice.reducer;
