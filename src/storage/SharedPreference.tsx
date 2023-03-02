import RNSInfo from 'react-native-sensitive-info';

export const kSharedKeys = {
  userDetails: 'userDetails',
  authToken: 'token',
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
    return await RNSInfo.getItem(key, options);
  };

  setItem = async (key: string, value: string) => {
    return await RNSInfo.setItem(key, value, options);
  };

  removeItem = async (key: string) => {
    await RNSInfo.deleteItem(key, options);
  };
}

export default SharedPreference;
