import * as contactsAPI from 'api/axios';
// import { contactsActions } from 'redux/items/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastMessage } from 'components/Form/form-helper';

//#region THUNKS

export const fetchContacts = createAsyncThunk('items/fetchContacts', async () => {
  try {
    const contacts = await contactsAPI.getAllContacts();

    if (contacts.length > 0) toastMessage('info', `${contacts.length} contact(s) successfully loaded!`);
    else toastMessage('warn', `No contacts founded.`);

    return contacts;
  } catch (err) {
    toastMessage('error', `${err}`);
  }
});

export const fetchPostSingleContact = createAsyncThunk('items/fetchPostSingleContact', async (contact) => {
  try {
    const singleContact = await contactsAPI.postSingleContact(contact);

    toastMessage('success', `New contact "${contact.name}" was added!`);

    return singleContact;
  } catch (err) {
    toastMessage('error', `${err}`);
  }
});

export const fetchRemoveSingleContact = createAsyncThunk('items/fetchRemoveSingleContact', async ({ id, name }) => {
  try {
    await contactsAPI.removeSingleContact(id);

    toastMessage('info', `Contact "${name}" was deleted!`);

    return id;
  } catch (err) {
    toastMessage('error', `${err}`);
  }
});

export const fetchRemoveAllContacts = createAsyncThunk('items/fetchRemoveAllContacts', async () => {
  try {
    let contacts = await contactsAPI.getAllContacts();
    contacts.forEach(async (el) => await contactsAPI.removeSingleContact(el.id));

    toastMessage('info', `${contacts.length} contact(s) removed!`);

    return [];
  } catch (err) {
    toastMessage('error', `${err}`);
  }
});

//#endregion

//#region operations without thunk

// export const fetchContacts = () => async (dispatch) => {
//   dispatch(contactsActions.fetchContactsRequest());

//   try {
//     const contacts = await contactsAPI.getAllContacts();

//     dispatch(contactsActions.fetchContactsSuccess(contacts));
//   } catch (error) {
//     dispatch(contactsActions.fetchContactsError(error));
//   }
// };

// export const fetchPostSingleContact = (contact) => async (dispatch) => {
//   dispatch(contactsActions.fetchContactsRequest());

//   try {
//     const contactRequest = await contactsAPI.postSingleContact(contact);
//     dispatch(contactsActions.fetchSingleContactSuccess(contactRequest));
//   } catch (error) {
//     dispatch(contactsActions.fetchContactsError(error));
//   }
// };

// export const fetchRemoveSingleContact = (id) => async (dispatch) => {
//   dispatch(contactsActions.fetchContactsRequest());

//   try {
//     await contactsAPI.removeSingleContact(id);
//     dispatch(contactsActions.fetchRemoveContactSuccess(id));
//   } catch (error) {
//     dispatch(contactsActions.fetchContactsError(error));
//   }
// };

// export const fetchRemoveAllContacts = () => async (dispatch) => {
//   dispatch(contactsActions.fetchContactsRequest());

//   try {
//     const contacts = await contactsAPI.getAllContacts();
//     contacts.forEach((el) => contactsAPI.removeSingleContact(el.id));
//     dispatch(contactsActions.fetchRemoveAllContactsSuccess(contacts));
//   } catch (error) {
//     dispatch(contactsActions.fetchContactsError(error));
//   }
// };

//#endregion
