import * as contactsAPI from 'api/contactsAPI';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastMessage } from 'helpers/form-helper';

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

export const fetchPatchSingleContact = createAsyncThunk(
  'items/fetchPatchSingleContact',
  async ({ id, name, number }) => {
    try {
      const singleContact = await contactsAPI.patchSingleContact(id, { name, number });

      toastMessage('success', `Contact "${name}" was saved!`);

      return singleContact;
    } catch (err) {
      toastMessage('error', `${err}`);
    }
  }
);

export const fetchRemoveSingleContact = createAsyncThunk('items/fetchRemoveSingleContact', async ({ id, name }) => {
  try {
    await contactsAPI.removeSingleContact(id);

    toastMessage('info', `Contact "${name}" was deleted!`);
    console.log('id', id);
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
