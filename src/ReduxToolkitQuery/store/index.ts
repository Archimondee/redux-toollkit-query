import {
  combineReducers,
  applyMiddleware,
  legacy_createStore as createStore,
} from 'redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
//@ts-ignore
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {persistReducer, persistStore} from 'redux-persist';
import {createLogger} from 'redux-logger';
import {userApi} from './user/userServices';
import {configureStore} from '@reduxjs/toolkit';
import {authApi} from './auth/authService';
import persistSlice from './persist/persistSlice';

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  persist: persistSlice.reducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 3,
  whitelist: ['persist'], // select reducer to persist
  stateReconciler: autoMergeLevel2,
};

//@ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger: any = createLogger({
  duration: true,
  //@ts-ignore
  colors: {title: () => 'blue', error: () => 'red'},
  stateTransformer: state => {
    return {
      ...state,
    };
  },
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({serializableCheck: false}).concat(
      userApi.middleware,
      authApi.middleware,
      logger,
    );

    return middleware;
  },
});

const persistor = persistStore(store);
export {store, persistor};
