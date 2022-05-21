import React from 'react';
import {PairItemStyle} from '../../../Styles/Items';
import {Icon} from 'react-native-elements';
import {CustomText} from '../CustomText';
import {TouchableOpacity} from 'react-native';
import {BottomSheetItemStyles} from '../../../Styles/Sheets';
import {useThemes} from '../../../Providers/ThemeProvider';

export const BottomSheetItem = ({title, iconName, onPress}) => {
  const {theme} = useThemes();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        PairItemStyle.container,
        PairItemStyle.wrapper,
        BottomSheetItemStyles.container,
      ]}>
      <Icon name={iconName} type={'material-community'} color={theme.text} />
      <CustomText style={BottomSheetItemStyles.title}>{title}</CustomText>
    </TouchableOpacity>
  );
};
