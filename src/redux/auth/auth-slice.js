import { createSlice } from '@reduxjs/toolkit';
import * as userOperations from 'redux/auth/auth-operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  error: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [userOperations.registerUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },

    [userOperations.registerUser.rejected]: (state, action) => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.error = action.payload;
    },

    [userOperations.loginUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },

    [userOperations.logoutUser.fulfilled]: (state, _) => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export default userSlice.reducer;
