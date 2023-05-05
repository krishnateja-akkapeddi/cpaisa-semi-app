import {Alert, Platform, Linking} from 'react-native';
import {check, request} from 'react-native-permissions';
import {PermissionsList, PermissionType, PlatformType} from './PermissionsList';

export async function Permission(
  permissionType: PermissionType,
  platform: PlatformType,
  job: 'get' | 'check',
) {
  let result;

  if (job === 'check') {
    result = await check(PermissionsList[platform][permissionType]);
  } else {
    result = await request(PermissionsList[platform][permissionType]);
  }
  console.log('UREDER_', result);
  if (result === 'granted') {
    return true;
  } else if (result === 'blocked' || 'denied' || 'unavailable') {
    return false;
  } else {
    return false;
  }
}

export function requestManualPermission(permissionType: string) {
  Alert.alert(
    `${permissionType.toUpperCase()} Permission Required`,
    `This app needs access to your ${permissionType.toUpperCase()} to function properly. Please go to settings and enable the ${permissionType} permissions`,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Settings',
        onPress: () => {
          if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
            return false;
          } else {
            Linking.openSettings();
            return false;
          }
        },
      },
    ],
  );
}
