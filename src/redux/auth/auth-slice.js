import { createSlice } from '@reduxjs/toolkit';
import * as userOperations from 'redux/auth/auth-operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isFetching: false,
  error: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [userOperations.registerUser.pending](state, _) {
      state.isFetching = true;
    },

    [userOperations.loginUser.pending](state, _) {
      state.isFetching = true;
    },

    [userOperations.logoutUser.pending](state, _) {
      state.isFetching = true;
    },

    [userOperations.registerUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isFetching = false;
    },

    [userOperations.registerUser.rejected](state, action) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.error = action.payload;
      state.isFetching = false;
    },

    [userOperations.loginUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isFetching = false;
    },

    [userOperations.logoutUser.fulfilled](state, _) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isFetching = false;
    },

    [userOperations.loginUser.rejected](state, action) {
      state.isLoggedIn = false;
      state.isFetching = false;
    },

    [userOperations.logoutUser.rejected](state, _) {
      state.isFetching = false;
    },
  },
});

export default userSlice.reducer;
