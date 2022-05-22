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

export const USER_PAIR_PERMISSIONS = {
  view: 'View.UserPair',
  create: 'Create.UserPair',
  update: 'Update.UserPair',
};

export const VISIT_PERMISSIONS = {
  view: 'View.Visit',
};

export const SELF_QR_CODE_PERMISSIONS = {
  view: 'View.SelfQRCode',
};

export const VIEW_PAIR_AS_INSTRUCTOR = [
  PAIR_PERMISSIONS.view,
  USER_PAIR_PERMISSIONS.view,
  USER_PAIR_PERMISSIONS.create,
  USER_PAIR_PERMISSIONS.update,
];

export const VIEW_PAIR_AS_LERNER = [
  USER_PAIR_PERMISSIONS.view,
  VISIT_PERMISSIONS.view,
];
