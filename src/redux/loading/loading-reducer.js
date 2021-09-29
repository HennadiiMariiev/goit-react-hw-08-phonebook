import { createReducer } from '@reduxjs/toolkit';

import {
  fetchPostSingleContact,
  fetchContacts,
  fetchRemoveSingleContact,
  fetchRemoveAllContacts,
} from 'redux/items/items-operations';

export const loadingReducer = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchPostSingleContact.pending]: () => true,
  [fetchRemoveSingleContact.pending]: () => true,
  [fetchRemoveAllContacts.pending]: () => true,

  [fetchContacts.fulfilled]: () => false,
  [fetchPostSingleContact.fulfilled]: () => false,
  [fetchRemoveSingleContact.fulfilled]: () => false,
  [fetchRemoveAllContacts.fulfilled]: () => false,

  [fetchContacts.rejected]: () => false,
  [fetchPostSingleContact.rejected]: () => false,
  [fetchRemoveSingleContact.rejected]: () => false,
  [fetchRemoveAllContacts.rejected]: () => false,
});
