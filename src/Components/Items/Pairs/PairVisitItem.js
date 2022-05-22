import React from 'react';
import type {Visit} from '../../../Models/Visits';
import {View} from 'react-native';
import {CustomText} from '../../Common/CustomText';
import {PairItemStyle, UserPairItemStyles} from '../../../Styles/Items';
import {useThemes} from '../../../Providers/ThemeProvider';
import {formatVisitTime} from '../../../Utils/Helpers/Formatters';
import {VisitState} from '../../Blocks/Pairs/VisitState';
import {comp} from '../../../Styles/Blocks';

type Props = {
  visit: Visit,
};

export const PairVisitItem = (props: Props) => {
  const {visit} = props;
  const {theme} = useThemes();

  return (
    <View
      style={[
        {backgroundColor: theme.listItem},
        PairItemStyle.container,
        PairItemStyle.wrapper,
        UserPairItemStyles.container,
      ]}>
      <CustomText style={PairItemStyle.title}>
        {formatVisitTime(visit.when)}
      </CustomText>
      <View style={comp.flex} />
      <VisitState visit={visit} />
    </View>
  );
};
