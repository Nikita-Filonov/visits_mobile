import React from 'react';
import {View} from 'react-native';
import {CustomText} from '../CustomText';
import {comp, DataGridStyles} from '../../../Styles/Blocks';
import {useThemes} from '../../../providers/ThemeProvider';

export const DataGridHeader = ({columns}) => {
  const {theme} = useThemes();

  return (
    <View
      style={[DataGridStyles.headerContainer, {borderColor: theme.disabled}]}>
      {columns?.map((col, index) => (
        <View
          key={index}
          style={[
            DataGridStyles.headerWrapper,
            {width: col?.width, flex: col?.flex},
          ]}>
          <CustomText style={comp.smallText}>{col?.headerName}</CustomText>
        </View>
      ))}
    </View>
  );
};
