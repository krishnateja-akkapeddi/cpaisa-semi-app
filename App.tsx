import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/Store';
import AppNavigator from './src/navigation/navigator/AppNavigator';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AlertNotificationRoot} from 'react-native-alert-notification';

enableScreens();

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
