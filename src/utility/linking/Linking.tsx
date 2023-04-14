import {Platform, Linking} from 'react-native';

export const dialCall = (mobile: string) => {
  let phoneNumber = '';

  if (Platform.OS === 'android') {
    phoneNumber = `tel:${mobile}`;
  } else {
    phoneNumber = `telprompt:${mobile}`;
  }

  Linking.openURL(phoneNumber);
};
