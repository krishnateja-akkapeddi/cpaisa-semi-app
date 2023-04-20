import {Platform} from 'react-native';
import {PermissionType} from './PermissionsList';
import {Permission} from './PermissionWorkers';

class Permissions {
  private platform: any;
  constructor(platform: any) {
    this.platform = platform;
  }
  async getPermission(permissionType: PermissionType) {
    return Permission(permissionType, this.platform, 'get');
  }
  async checkPermissions(perm: PermissionType) {
    return Permission(perm, this.platform, 'check');
  }
}
export const PermissionManager = new Permissions(Platform.OS);
