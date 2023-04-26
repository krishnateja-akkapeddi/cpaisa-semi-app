import RNSInfo from 'react-native-sensitive-info';

export const kSharedKeys = {
  userDetails: 'userDetails',
  authToken: 'token',
  fcmToken: 'FCM_TOKEN',
};

const options: RNSInfo.RNSensitiveInfoOptions = {
  sharedPreferencesName: 'sharedPrefs',
  keychainService: 'keychain',
};

class SharedPreference {
  private constructor() {}

  private static _instance: SharedPreference = new SharedPreference();

  static get shared(): SharedPreference {
    return SharedPreference._instance;
  }

  getItem = async (key: string) => {
    return RNSInfo.getItem(key, options);
  };

  setItem = async (key: string, value: string) => {
    return RNSInfo.setItem(key, value, options);
  };

  removeItem = async (key: string) => {
    RNSInfo.deleteItem(key, options);
  };

  getUser = async () => {
    return RNSInfo.getItem(kSharedKeys.userDetails, options);
  };

  setUser = async (value: string) => {
    await RNSInfo.setItem(kSharedKeys.userDetails, value, options);
  };

  setToken = async (value: string) => {
    await RNSInfo.setItem(kSharedKeys.authToken, value, options);
  };

  setFcmToken = async (value: string) => {
    await RNSInfo.setItem(kSharedKeys.fcmToken, value, options);
  };

  getFcmToken = async () => {
    return RNSInfo.getItem(kSharedKeys.fcmToken, options);
  };
}

export default SharedPreference;
