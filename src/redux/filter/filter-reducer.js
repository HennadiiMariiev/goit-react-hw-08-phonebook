import { createReducer } from '@reduxjs/toolkit';
import { setFilter } from './filter-actions';

export const filterReducer = createReducer('', {
  [setFilter]: (_, { payload }) => payload.toString(),
});

//#region BEFORE REFACTOR
// import { filterTypes } from './filter-types';

// export const filterReducer = (filter = '', { type, payload }) => {
//   switch (type) {
//     case filterTypes.CLEAR:
//     case filterTypes.SET:
//       return (filter = payload);

//     default:
//       return filter;
//   }
// };
//#endregion
