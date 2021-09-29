import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from 'redux/filter/filter-reducer';
import { itemsReducer } from 'redux/items/items-reducer';
import { loadingReducer } from 'redux/loading/loading-reducer';
import { errorReducer } from 'redux/error/error-reducer';

const initialState = {
  contacts: {
    items: [],
    filter: '',
    isLoading: false,
    error: null,
  },
};

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  isLoading: loadingReducer,
  error: errorReducer,
});

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { initialState, store };
