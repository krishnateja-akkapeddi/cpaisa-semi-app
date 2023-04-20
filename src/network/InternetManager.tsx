import {Alert} from 'react-native';
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import ENV from './Env';

class InternetManager {
  private unsubscribe?: NetInfoSubscription;
  state?: NetInfoState;

  private static _instance: InternetManager = new InternetManager();

  static get shared(): InternetManager {
    return InternetManager._instance;
  }

  private constructor() {}

  setup() {
    if (this.unsubscribe == null) {
      this.unsubscribe = NetInfo.addEventListener(state => {
        this.state = state;
      });
    }
  }

  checkNetwork(showAlert = true) {
    if (this.state && this.state.isInternetReachable) {
      return true;
    } else if (showAlert) {
      Alert.alert(ENV.APP_NAME, 'Not Reachable', [{text: 'Ok'}]);
      return false;
    }
  }
}

export default InternetManager;
