import React from 'react';
import {View} from 'react-native';
import {comp} from '../../../../styles/Blocks';
import {MonsterAvatar} from '../../../blocks/timers/MonsterAvatar';
import {baseUrl} from '../../../../utils/Links';
import {CustomText} from '../../../common/CustomText';

export const Game = ({item}) => <View style={[comp.rowContainer, {padding: 5}]}>
  <MonsterAvatar image={baseUrl + `static/images/games/${item.code}.png`}/>
  <CustomText style={[comp.normalText, {marginLeft: 15}]}>{item.name}</CustomText>
</View>;
