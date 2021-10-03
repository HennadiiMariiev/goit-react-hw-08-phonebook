import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from 'api/axios';
import { toastMessage } from 'components/Form/form-helper';

export const registerUser = createAsyncThunk('auth/register', async (data) => {
  try {
    const userData = await userApi.registerUser(data);

    toastMessage('success', `New user "${userData.user.name}" was registered!`);

    return userData;
  } catch (error) {
    toastMessage('error', `${error}`);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
  try {
    const userData = await userApi.loginUser({ email, password });

    toastMessage('success', `User "${userData.user.name}" was logged in!`);

    return userData;
  } catch (error) {
    toastMessage('error', `${error}`);
  }
});

export const currentUser = createAsyncThunk('auth/currentUser', async () => {
  try {
    const userData = await userApi.getCurrentUser();

    return userData;
  } catch (error) {
    console.log('error', `${error}`);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (name) => {
  try {
    await userApi.logoutUser();

    toastMessage('success', `User "${name}" was logged out!`);
  } catch (error) {
    toastMessage('error', `${error}`);
  }
});
