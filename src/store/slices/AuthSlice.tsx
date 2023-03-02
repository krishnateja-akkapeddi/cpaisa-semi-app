import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Slices} from '../../constants/Slices';
import {AuthResult, Data} from '../../models/interfaces/AuthResponse';

const initialState: {userInfo: Data} = {
  userInfo: {} as Data,
};

export const authSlice = createSlice({
  name: Slices.auth,
  initialState,
  reducers: {
    clearAuthSlice: () => initialState,
    storeAuthResult: (state, action: PayloadAction<AuthResult>) => {
      state.userInfo = action.payload.data;
    },
  },
});

export const {clearAuthSlice} = authSlice.actions;
export default authSlice.reducer;
