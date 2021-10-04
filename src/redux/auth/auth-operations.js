import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastMessage } from 'components/Form/form-helper';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = token;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const registerUser = createAsyncThunk('auth/register', async (credentials) => {
  try {
    const { data } = await axios.post('/users/signup', credentials);
    token.set(data.token);
    toastMessage('success', `New user "${data.user.name}" was registered!`);
    return data;
  } catch (error) {
    toastMessage('error', `${error}`);
    throw new Error(error);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
  try {
    const { data } = await axios.post('/users/login', { email, password });
    token.set(data.token);
    toastMessage('success', `User "${data.user.name}" was logged in!`);
    return data;
  } catch (error) {
    toastMessage('error', `${error}`);
    throw new Error(error);
  }
});

export const currentUser = createAsyncThunk('auth/currentUser', async () => {
  try {
    const { data } = await axios.get('/users/current');

    return data;
  } catch (error) {
    console.log('error', `${error}`);
    throw new Error(error);
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (name) => {
  try {
    await axios.post('/users/logout');
    token.unset();

    toastMessage('success', `User "${name}" was logged out!`);
  } catch (error) {
    toastMessage('error', `${error}`);
    throw new Error(error);
  }
});
