import React, {forwardRef} from 'react';
import {Dimensions} from 'react-native';
import {CustomBottomSheet} from './CustomBottomSheet';
import {BottomSheetItem} from './BottomSheetItem';

export const UserPairBottomSheet = forwardRef((props, ref) => {
  const onSelect = async item => {
    ref?.snapTo(2);
  };

  return (
    <CustomBottomSheet
      ref={ref}
      snapPoints={[Dimensions.get('window').height / 3, 200, 0]}>
      <BottomSheetItem
        title={'Отметить пропуск'}
        iconName={'account-remove-outline'}
      />
      <BottomSheetItem
        title={'На больничном'}
        iconName={'home-thermometer-outline'}
      />
      <BottomSheetItem title={'Посещения'} iconName={'format-list-checks'} />
      <BottomSheetItem title={'Удалить из пары'} iconName={'delete-outline'} />
    </CustomBottomSheet>
  );
});
