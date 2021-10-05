import axios from 'axios';
// const axios = require("axios");

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const getAllContacts = async () => {
  const { data } = await axios.get('/contacts');
  return data;
};

export const postSingleContact = async (contact) => {
  const { data } = await axios.post('/contacts/', contact);
  return data;
};

export const patchSingleContact = async (id, { name, number }) => {
  const { data } = await axios.patch('/contacts/' + id, { name, number });
  return data;
};

export const removeSingleContact = async (id) => {
  const { data } = await axios.delete('/contacts/' + id);
  return data;
};
