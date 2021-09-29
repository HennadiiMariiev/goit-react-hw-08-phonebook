// import axios from "axios";
const axios = require("axios");

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const signUpUser = async (credentials) => {
  const { data } = await axios.post("/users/signup", credentials);
  console.log(data);
  return data;
};

const loginUser = async (credentials) => {
  const { data } = await axios.post("/users/login", credentials);
  console.log(data);
  return data;
};

const logoutUser = async (credentials) => {
  try {
    const { data } = await axios.post("/users/logout", null, credentials);
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const getCurrentUser = async () => {
//   const { data } = await axios.get("/users/current");
//   return data;
// };

// export const getAllContacts = async () => {
//   const { data } = await axios.get("/contacts");
//   return data;
// };

// export const postSingleContact = async (contact) => {
//   const { data } = await axios.post("/contacts/", contact);
//   return data;
// };

// export const removeSingleContact = async (id) => {
//   const { data } = await axios.delete("/contacts/" + id);
//   return data;
// };

const user1 = {
  name: "Peter Test2",
  email: "peter_test@mail.com",
  password: "qweqwe123",
};
const user2 = {
  name: "Ivan Test3",
  email: "ivante_test@mail.com",
  password: "qweqwe321",
};

// signUpUser(user1);
// loginUser({ email: user1.email, password: user1.password });
const token = {
  Authorization:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTU0NzliZWU2NTY2ODAwMTUwZWVkMzciLCJpYXQiOjE2MzI5MjYxNDJ9.g35cKQ8Ai9ezKj0GSzbHS5d3HCOUV0rz_BBpguyCYrA",
};

const headers = {
  Authorization:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTU0NzliZWU2NTY2ODAwMTUwZWVkMzciLCJpYXQiOjE2MzI5MjYxNDJ9.g35cKQ8Ai9ezKj0GSzbHS5d3HCOUV0rz_BBpguyCYrA",
};

logoutUser({ headers: headers });
