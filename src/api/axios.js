import axios from 'axios';
// const axios = require("axios");

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = token;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const registerUser = async (credentials) => {
  const { data } = await axios.post('/users/signup', credentials);
  token.set(data.token);
  return data;
};

export const loginUser = async (credentials) => {
  const { data } = await axios.post('/users/login', credentials);
  token.set(data.token);

  return data;
};

export const logoutUser = async () => {
  try {
    const { data } = await axios.post('/users/logout');
    token.unset();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async (credentials) => {
  try {
    const { data } = await axios.get('/users/current', credentials);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllContacts = async () => {
  const { data } = await axios.get('/contacts');
  return data;
};

export const postSingleContact = async (contact) => {
  const { data } = await axios.post('/contacts/', contact);
  return data;
};

export const removeSingleContact = async (id) => {
  const { data } = await axios.delete('/contacts/' + id);
  return data;
};

// const user1 = {
//   name: "Acc Test2",
//   email: "acc_test2@mail.com",
//   password: "example12345",
// };
// const user2 = {
//   name: "Acc Test3",
//   email: "acc_test3@mail.com",
//   password: "qweqwe321",
// };

// signUpUser(user2);
// loginUser({ email: user2.email, password: user2.password });

// const headers = {
//   Authorization:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTU0NzJmOWU2NTY2ODAwMTUwZWVkMzMiLCJpYXQiOjE2MzI5ODg1ODl9.qLwidu73mt87emxZIKohKbzdcNz_hQdh01Mt6gIFZ-M",
// };

// getCurrentUser({ headers });
