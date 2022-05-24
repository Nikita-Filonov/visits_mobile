import React from 'react';
import {View} from 'react-native';
import {CustomText} from '../../../Common/CustomText';
import {comp, VisitScoreItemStyles} from '../../../../Styles/Blocks';

type Props = {
  stateColor: string,
  title: string,
  subtitle: string,
};

export const VisitScoreItem = (props: Props) => {
  const {stateColor, title, subtitle} = props;

  return (
    <View style={VisitScoreItemStyles.container}>
      <View>
        <CustomText style={VisitScoreItemStyles.title}>{title}</CustomText>
        <CustomText>{subtitle}</CustomText>
      </View>
      <View style={comp.flex} />
      <View
        style={[VisitScoreItemStyles.scoreDot, {backgroundColor: stateColor}]}
      />
    </View>
  );
};
