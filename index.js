/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import InternetManager from './src/network/InternetManager';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => {
  initialAppSetup();
  return App;
});

const initialAppSetup = () => {
  InternetManager.shared.setup();
};
