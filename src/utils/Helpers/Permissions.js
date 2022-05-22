import {PermissionsAndroid} from 'react-native';

export const getCameraPermissions = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const PAIR_PERMISSIONS = {
  create: 'Create.Pair',
  view: 'View.Pair',
};

export const GROUP_PERMISSIONS = {
  create: 'Create.Group',
  view: 'View.Group',
};
