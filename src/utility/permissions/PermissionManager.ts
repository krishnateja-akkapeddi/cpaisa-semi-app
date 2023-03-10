import {
  PERMISSIONS,
  check,
  RESULTS,
  request,
  Permission,
} from 'react-native-permissions';
import {Platform} from 'react-native';

type PERMISSION_TYPE = {
  location: any;
  files: any;
};

const PLATFORM_LOCATION_PERMISSIONS = {
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};

const PLATFORM_FILE_PERMISSIONS = {
  ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
  android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const REQUEST_PERMISSION_TYPE: PERMISSION_TYPE = {
  location: PLATFORM_LOCATION_PERMISSIONS,
  files: PLATFORM_FILE_PERMISSIONS,
};

export const PERMISSION_TYPE = {
  location: 'location',
  files: 'files',
};

export function perm(type: keyof PERMISSION_TYPE): Permission {
  const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
  return permissions;
}
class AppPermission {
  checkPermission = async (type: keyof PERMISSION_TYPE): Promise<boolean> => {
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    if (!permissions) {
      return true;
    }
    try {
      const result = await check(permissions);
      if (result === RESULTS.GRANTED) return true;

      return false;
    } catch (error) {
      return false;
    }
  };

  requestPermission = async (permissions: Permission): Promise<boolean> => {
    try {
      const result = await request(permissions);
      return result === RESULTS.GRANTED;
    } catch (error) {
      return false;
    }
  };
}

const PermissionManager = new AppPermission();

export {PermissionManager};
