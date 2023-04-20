import {PermissionManager} from '../permissions/PermissionManager';
import GetLocation from 'react-native-get-location';
import {PermissionType} from '../permissions/PermissionsList';

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 15000,
};
const getLocation = async () => {
  const checkPermissions = await PermissionManager.checkPermissions(
    PermissionType.LOCATION,
  );
  if (checkPermissions === false) {
    const requestPermissions = await PermissionManager.getPermission(
      PermissionType.LOCATION,
    );
    if (requestPermissions) {
      const location = await GetLocation.getCurrentPosition(locationOptions);
      return location;
    }
  } else {
    const location = await GetLocation.getCurrentPosition(locationOptions);
    return location;
  }
};
export default getLocation;
