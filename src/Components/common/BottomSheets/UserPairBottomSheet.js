import React from 'react';
import {Dimensions} from 'react-native';
import {CustomBottomSheet} from './CustomBottomSheet';

export const UserPairBottomSheet = React.forwardRef(
  ({sort, setSort, backup}, ref) => {
    const onSelect = async item => {
      ref?.snapTo(2);
    };

    return (
      <CustomBottomSheet
        ref={ref}
        snapPoints={[Dimensions.get('window').height / 2.4, 200, 0]}
      />
    );
  },
);
