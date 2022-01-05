/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {Colors, Constants} from './app/res';
import MainStackNavigator from './app/src/navigations/MainStackNavigator';
import {createStore} from 'redux';
import appReducer from './app/src/redux/reducers/appReducer';
import {Provider} from 'react-redux';
import AppLoader from './app/src/components/AppLoader';

console.disableYellowBox = true;
const store = createStore(appReducer);

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={Colors.black}
      />
      <MainStackNavigator initialRoute={Constants.routeName.Home} />
      <AppLoader />
    </Provider>
  );
};

export default App;
