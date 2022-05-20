import React from 'react';
import {DrawerLayout} from '../../components/Layouts/DrawerLayout';
import {CustomFab} from '../../components/common/CustomFab';

export const Pairs = ({navigation}) => {
  const onCreate = () => navigation.navigate('CreatePair');

  return (
    <DrawerLayout title={'Пары'} navigation={navigation}>
      <CustomFab onPress={onCreate} withoutWrapper={true} />
    </DrawerLayout>
  );
};
