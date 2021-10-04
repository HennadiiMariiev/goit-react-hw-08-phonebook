import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from 'redux/filter/filter-reducer';
import { itemsReducer } from 'redux/items/items-reducer';
import { loadingReducer } from 'redux/loading/loading-reducer';
import { errorReducer } from 'redux/error/error-reducer';
import authReducer from 'redux/auth/auth-slice';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
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

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

export { store, persistor };
