import {Platform} from 'react-native';
import {PermissionType} from './PermissionsList';
import {Permission} from './PermissionWorkers';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

class Permissions {
  private platform: any;
  constructor(platform: any) {
    this.platform = platform;
  }
  async getPermission(permissionType: PermissionType) {
    return Permission(permissionType, this.platform, 'get');
  }
  async checkPermissions(perm: PermissionType, callbackOnDenied?: Function) {
    return Permission(
      perm,
      this.platform,
      'check',
      callbackOnDenied ?? callbackOnDenied,
    );
  }
  async locationEnabler(): Promise<boolean> {
    const result =
      await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then(data => {
          // The user has accepted to enable the location services
          // data can be :
          //  - "already-enabled" if the location services has been already enabled
          //  - "enabled" if user has clicked on OK button in the popup
          return true;
        })
        .catch(err => {
          // The user has not accepted to enable the location services or something went wrong during the process
          // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
          // codes :
          //  - ERR00 : The user has clicked on Cancel button in the popup
          //  - ERR01 : If the Settings change are unavailable
          //  - ERR02 : If the popup has failed to open
          //  - ERR03 : Internal error
          console.log('ERR_FROM_ENABLER', err);

          return false;
        });
    return result;
  }
}
export const PermissionManager = new Permissions(Platform.OS);
