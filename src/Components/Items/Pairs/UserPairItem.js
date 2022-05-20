import React from 'react';
import {View} from 'react-native';
import {CustomText} from '../../common/CustomText';
import {PairItemStyle} from '../../../Styles/Items';
import {useThemes} from '../../../Providers/ThemeProvider';

export const UserPairItem = ({userPair}) => {
  const {theme} = useThemes();

  return (
    <View style={[{backgroundColor: theme.listItem}, PairItemStyle.container]}>
      <CustomText style={PairItemStyle.title}>
        {userPair.user.username}
      </CustomText>
      <CustomText>{userPair.user.email}</CustomText>
    </View>
  );
};
