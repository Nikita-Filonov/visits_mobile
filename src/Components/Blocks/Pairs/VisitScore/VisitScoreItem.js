import React from 'react';
import {View} from 'react-native';
import {CustomText} from '../../../Common/CustomText';
import {comp} from '../../../../Styles/Blocks';

export const VisitScoreItem = ({stateColor}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View>
        <CustomText style={{fontSize: 17}}>Баллы за посещения: 1</CustomText>
        <CustomText>Всего пропусков: 5</CustomText>
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
