import React from 'react';
import {TouchableOpacity} from 'react-native';
import {CustomText} from '../../common/CustomText';
import {useThemes} from '../../../Providers/ThemeProvider';

export const PairItem = ({pair}) => {
  const {theme} = useThemes();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.listItem,
        paddingVertical: 15,
        borderRadius: 3,
        paddingHorizontal: 10,
        elevation: 1.5,
      }}>
      <CustomText style={{fontSize: 17}}>{pair.name}</CustomText>
      <CustomText>{pair.room}</CustomText>
    </TouchableOpacity>
  );
};
