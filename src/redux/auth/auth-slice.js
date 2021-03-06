import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser, fetchCurrentUser, selectAvatar } from 'redux/auth/auth-operations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  avatar: null,
  isLoggedIn: false,
  isFetching: false,
  error: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [registerUser.pending](state, _) {
      state.isFetching = true;
    },

    [loginUser.pending](state, _) {
      state.isFetching = true;
    },

    [fetchCurrentUser.pending](state, _) {
      state.isFetching = true;
      state.isLoggedIn = false;
    },

    [logoutUser.pending](state, _) {
      state.isFetching = true;
    },

    [registerUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.avatar = null;
      state.isLoggedIn = true;
      state.isFetching = false;
    },

    [loginUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isFetching = false;
    },

    [fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload.data;
      state.avatar = action.payload.avatar;
      state.isLoggedIn = true;
      state.isFetching = false;
    },

    [logoutUser.fulfilled](state, _) {
      state.user = { name: null, email: null };
      state.token = null;
      state.avatar = null;
      state.isLoggedIn = false;
      state.isFetching = false;
    },

    [registerUser.rejected](state, action) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.error = action.payload;
      state.isFetching = false;
    },

    [loginUser.rejected](state, _) {
      state.isLoggedIn = false;
      state.isFetching = false;
    },

    [logoutUser.rejected](state, _) {
      state.isFetching = false;
    },

    [fetchCurrentUser.rejected](state, _) {
      state.isFetching = false;
      state.isLoggedIn = false;
    },

    [selectAvatar.fulfilled](state, action) {
      state.avatar = action.payload;
    },
  },
});

export default userSlice.reducer;
