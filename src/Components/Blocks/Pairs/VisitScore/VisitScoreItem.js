import React from 'react';
import {View} from 'react-native';
import {CustomText} from '../../../Common/CustomText';
import {comp} from '../../../../Styles/Blocks';

type Props = {
  stateColor: string,
  title: string,
  subtitle: string,
};

export const VisitScoreItem = (props: Props) => {
  const {stateColor, title, subtitle} = props;

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View>
        <CustomText style={{fontSize: 17}}>{title}</CustomText>
        <CustomText>{subtitle}</CustomText>
      </View>
      <View style={comp.flex} />
      <View
        style={{
          backgroundColor: stateColor,
          width: 20,
          height: 20,
          borderRadius: 15,
        }}
      />
    </View>
  );
};
