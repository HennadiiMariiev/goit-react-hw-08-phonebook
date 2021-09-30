import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from 'redux/filter/filter-reducer';
import { itemsReducer } from 'redux/items/items-reducer';
import { loadingReducer } from 'redux/loading/loading-reducer';
import { errorReducer } from 'redux/error/error-reducer';
import authReducer from 'redux/auth/auth-slice';

const initialState = {
  contacts: {
    items: [],
    filter: '',
    isLoading: false,
    error: null,
  },
  auth: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
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
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { initialState, store };
