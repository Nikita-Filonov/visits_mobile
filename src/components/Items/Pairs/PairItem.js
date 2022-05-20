import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {CustomText} from '../../common/CustomText';
import {useThemes} from '../../../Providers/ThemeProvider';
import {formatPairTime} from '../../../utils/Helpers/Formatters';
import {PairItemStyle} from '../../../Styles/Items';

export const PairItem = ({pair}) => {
  const {theme} = useThemes();

  return (
    <TouchableOpacity
      style={[{backgroundColor: theme.listItem}, PairItemStyle.container]}>
      <View style={PairItemStyle.wrapper}>
        <View style={PairItemStyle.timeWrapper}>
          <CustomText style={PairItemStyle.title}>
            {formatPairTime(pair.startAt, 'HH:mm:ss')}
          </CustomText>
          <CustomText>{formatPairTime(pair.endAt, 'HH:mm:ss')}</CustomText>
        </View>
        <View
          style={[
            {backgroundColor: theme.button.primary},
            PairItemStyle.divider,
          ]}
        />
        <View style={PairItemStyle.nameWrapper}>
          <CustomText style={PairItemStyle.title}>{pair.name}</CustomText>
          <CustomText>{pair.room}</CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};
