/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MainScreenRedux from './src/Redux/screens';
import MainReduxToolkit from './src/ReduxToolkit/screens';
import MainReduxToolkitQuery from './src/ReduxToolkitQuery/screens';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedTab, setSelectedTab] = useState(0);
  const Space = () => {
    return <View style={{height: 20}} />;
  };
  const listTab = [
    {
      id: 0,
      title: 'Redux',
    },
    {
      id: 1,
      title: 'RTK',
    },
    {
      id: 2,
      title: 'RTK Query',
    },
  ];

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onChangeMenu = (id: number) => {
    setSelectedTab(id);
  };

  return (
    <View style={{paddingTop: 60, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {listTab.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onChangeMenu(index)}
              key={index}
              style={{
                borderBottomWidth: selectedTab === item.id ? 1 : 0,
                paddingBottom: 5,
                flex: 1,
              }}>
              <Text style={{textAlign: 'center'}}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Space />
      <ScrollView
        style={{
          height: '100%',
          backgroundColor: 'white',

          paddingHorizontal: 25,
        }}>
        <Space />
        {selectedTab === 0 && <MainScreenRedux />}
        {selectedTab === 1 && <MainReduxToolkit />}
        {selectedTab === 2 && <MainReduxToolkitQuery />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
