import {
  combineReducers,
  applyMiddleware,
  legacy_createStore as createStore,
} from 'redux';
import {TodoState} from './todo/todoSlice';
import todo from './todo/todoSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
//@ts-ignore
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {persistReducer as pReducer, persistStore} from 'redux-persist';
import {createLogger} from 'redux-logger';

export interface StoreStateType {
  todo: TodoState;
}

const rootReducer = combineReducers({
  todo,
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
const persistedReducer = pReducer(persistConfig, rootReducer);

const logger: any = createLogger({
  duration: true,
  //@ts-ignore
  colors: {title: () => 'blue', error: () => 'red'},
});

const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);
export {store, persistor};
