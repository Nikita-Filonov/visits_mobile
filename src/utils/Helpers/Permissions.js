import {PermissionsAndroid} from 'react-native';

export const getCameraPermissions = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  );

  return granted !== PermissionsAndroid.RESULTS.GRANTED;
};
