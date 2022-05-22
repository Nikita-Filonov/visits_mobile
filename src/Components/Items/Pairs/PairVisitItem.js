import React from 'react';
import type {Visit} from '../../../Models/Visits';
import {View} from 'react-native';
import {CustomText} from '../../common/CustomText';
import moment from 'moment';
import {PairItemStyle} from '../../../Styles/Items';
import {useThemes} from '../../../Providers/ThemeProvider';

type Props = {
  visit: Visit,
};

export const PairVisitItem = (props: Props) => {
  const {visit} = props;
  const {theme} = useThemes();

  console.log(visit.when);
  return (
    <View style={[{backgroundColor: theme.listItem}, PairItemStyle.container]}>
      <CustomText style={PairItemStyle.title}>
        {moment(visit.when).format('D MMMM YYYY, dddd')}
      </CustomText>
    </View>
  );
};
