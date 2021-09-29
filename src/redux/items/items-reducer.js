import { createReducer } from '@reduxjs/toolkit';
// import { contactsActions } from './index';
import {
  fetchContacts,
  fetchPostSingleContact,
  fetchRemoveSingleContact,
  fetchRemoveAllContacts,
} from './items-operations';

export const itemsReducer = createReducer([], {
  [fetchContacts.fulfilled]: (state, { payload }) => [...state, ...payload],
  [fetchPostSingleContact.fulfilled]: (state, { payload }) => [...state, payload],
  [fetchRemoveSingleContact.fulfilled]: (state, { payload }) => state.filter((item) => item.id !== Number(payload)),
  [fetchRemoveAllContacts.fulfilled]: () => [],

  // [contactsActions.fetchContactsSuccess]: (state, { payload }) => [...state, ...payload],
  // [contactsActions.fetchSingleContactSuccess]: (state, { payload }) => [...state, payload],
  // [contactsActions.fetchRemoveContactSuccess]: (state, { payload }) =>
  //   state.filter((item) => item.id !== Number(payload)),
  // [contactsActions.fetchRemoveAllContactsSuccess]: () => [],
});
