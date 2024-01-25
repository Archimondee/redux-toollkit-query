import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import HomeScreen from './HomeScreen/HomeScreen';
import {createStore} from 'redux';
import userReducer from '../store/user/taskReducer';

interface MainScreenReduxProps {}

const MainScreenRedux = (props: MainScreenReduxProps) => {
  const store = createStore(userReducer);
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

export default MainScreenRedux;
