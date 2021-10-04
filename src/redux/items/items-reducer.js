import { createReducer } from '@reduxjs/toolkit';

import {
  fetchContacts,
  fetchPostSingleContact,
  fetchRemoveSingleContact,
  fetchRemoveAllContacts,
  fetchPatchSingleContact,
} from './items-operations';

export const itemsReducer = createReducer([], {
  [fetchContacts.pending]: () => [],
  [fetchContacts.fulfilled]: (state, { payload }) => [...state, ...payload],
  [fetchPostSingleContact.fulfilled]: (state, { payload }) => [...state, payload],
  [fetchPatchSingleContact.fulfilled]: (state, { payload }) => [
    ...state.filter((item) => item.id !== payload.id),
    payload,
  ],
  [fetchRemoveSingleContact.fulfilled]: (state, { payload }) => state.filter((item) => item.id !== payload),
  [fetchRemoveAllContacts.fulfilled]: () => [],
});
