import { createReducer } from '@reduxjs/toolkit';

import {
  fetchPostSingleContact,
  fetchContacts,
  fetchRemoveSingleContact,
  fetchRemoveAllContacts,
} from 'redux/items/items-operations';

export const errorReducer = createReducer(null, {
  [fetchContacts.pending]: () => null,
  [fetchPostSingleContact.pending]: () => null,
  [fetchRemoveSingleContact.pending]: () => null,
  [fetchRemoveAllContacts.pending]: () => null,

  [fetchContacts.rejected]: (_, action) => action.payload,
  [fetchPostSingleContact.rejected]: (_, action) => action.payload,
  [fetchRemoveSingleContact.rejected]: (_, action) => action.payload,
  [fetchRemoveAllContacts.rejected]: (_, action) => action.payload,
});
