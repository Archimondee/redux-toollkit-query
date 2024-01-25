import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import HomeScreen from './HomeScreen/HomeScreen';
import {persistor, store} from '../store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

interface MainReduxToolkitQueryProps {}

const MainReduxToolkitQuery = (props: MainReduxToolkitQueryProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HomeScreen />
      </PersistGate>
    </Provider>
  );
};

export default MainReduxToolkitQuery;

const styles = StyleSheet.create({
  container: {},
});
