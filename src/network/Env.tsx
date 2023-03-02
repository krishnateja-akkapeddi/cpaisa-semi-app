import Config from 'react-native-config';

type NativeConfig = {
  APP_NAME: string;
  BASE_URL: string;
  PATH: string;
  AUTH_HEADER: string;
};

const ENV = Config as NativeConfig;
export default ENV;
