import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import HomeScreen from './HomeScreen/HomeScreen';
import {persistor, store} from '../store';
import {Provider} from 'react-redux';

interface MainReduxToolkitProps {}

const MainReduxToolkit = (props: MainReduxToolkitProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HomeScreen />
      </PersistGate>
    </Provider>
  );
};

export default MainReduxToolkit;

const styles = StyleSheet.create({
  container: {},
});
