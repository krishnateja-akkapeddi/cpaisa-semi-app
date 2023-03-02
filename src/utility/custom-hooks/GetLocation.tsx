import {PermissionManager} from '../permissions/PermissionManager';
import GetLocation from 'react-native-get-location';

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 15000,
};
const getLocation = async () => {
  const checkPermissions = await PermissionManager.checkPermission('location');
  if (checkPermissions === false) {
  } else {
    const location = await GetLocation.getCurrentPosition(locationOptions);
    return location;
  }
};
export default getLocation;
