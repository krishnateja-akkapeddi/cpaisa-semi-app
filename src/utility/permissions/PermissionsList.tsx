import {PERMISSIONS} from 'react-native-permissions';

export const PermissionsList = {
  android: {
    location: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    camera: PERMISSIONS.ANDROID.CAMERA,
    media: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  },
  ios: {
    location: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    camera: PERMISSIONS.IOS.CAMERA,
    media: PERMISSIONS.IOS.MEDIA_LIBRARY,
  },
};

export enum PermissionType {
  LOCATION = 'location',
  CAMERA = 'camera',
  MEDIA = 'media',
}

export enum PlatformType {
  ANDROID = 'android',
  IOS = 'ios',
}
