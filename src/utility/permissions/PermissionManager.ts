import {
  PERMISSIONS,
  check,
  RESULTS,
  request,
  Permission,
} from 'react-native-permissions';
import {Platform} from 'react-native';

type LOCATION_PERMISSION = {
  location: any;
};

const PLATFORM_LOCATION_PERMISSIONS = {
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};

const REQUEST_PERMISSION_TYPE: LOCATION_PERMISSION = {
  location: PLATFORM_LOCATION_PERMISSIONS,
};
export const PERMISSION_TYPE = {
  location: 'location',
};

export function perm(type: keyof LOCATION_PERMISSION): Permission {
  const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
  return permissions;
}
class AppPermission {
  checkPermission = async (
    type: keyof LOCATION_PERMISSION,
  ): Promise<boolean> => {
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
