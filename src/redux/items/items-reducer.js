import { createReducer, createSlice } from '@reduxjs/toolkit';

import {
  fetchContacts,
  fetchPostSingleContact,
  fetchRemoveSingleContact,
  fetchRemoveAllContacts,
  fetchPatchSingleContact,
} from './items-operations';

import { searchContactIndex } from 'helpers/searchByID';

const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  extraReducers: {
    [fetchContacts.pending](state) {
      state.length = 0;
    },
    [fetchContacts.fulfilled](state, action) {
      state.push(...action.payload);
    },
    [fetchPostSingleContact.fulfilled](state, action) {
      state.push(action.payload);
    },
    [fetchPatchSingleContact.fulfilled](state, action) {
      /* Sorry about this Really Bad Code. I have no idea how to mutate element in Array in Immer
       * without this crutches :D     In Map-function it doesn`t work. PatchContact works in
       * createReducer, but not here((
       */
      state[searchContactIndex(state, action)].name = action.payload.name;
      state[searchContactIndex(state, action)].number = action.payload.number;
    },
    [fetchRemoveSingleContact.fulfilled]: (state, action) => state.filter((item) => item.id !== action.payload),
    [fetchRemoveAllContacts.fulfilled](state) {
      state.length = 0;
    },
  },
});

// export const itemsReducer = createReducer([], {
//   [fetchContacts.pending]: () => [],
//   [fetchContacts.fulfilled]: (state, { payload }) => [...state, ...payload],
//   [fetchPostSingleContact.fulfilled]: (state, { payload }) => [...state, payload],
//   [fetchPatchSingleContact.fulfilled]: (state, { payload }) => [
//     ...state.map((item) => {
//       if (item.id === payload.id) {
//         item.name = payload.name;
//         item.number = payload.number;
//       }
//       return item;
//     }),
//   ],
//   [fetchRemoveSingleContact.fulfilled]: (state, { payload }) => state.filter((item) => item.id !== payload),
//   [fetchRemoveAllContacts.fulfilled]: () => [],
// });

export default itemsSlice.reducer;
