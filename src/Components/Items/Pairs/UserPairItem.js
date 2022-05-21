import React from 'react';
import {View} from 'react-native';
import {CustomText} from '../../common/CustomText';
import {PairItemStyle, UserPairItemStyles} from '../../../Styles/Items';
import {useThemes} from '../../../Providers/ThemeProvider';
import {CustomCheckbox} from '../../common/inputs/CustomCheckbox';
import {comp} from '../../../Styles/Blocks';
import {VisitState} from '../../blocks/Pairs/VisitState';

export const UserPairItem = ({userPair, checkUsersMode}) => {
  const {theme} = useThemes();

  return (
    <View
      style={[
        {backgroundColor: theme.listItem},
        PairItemStyle.container,
        PairItemStyle.wrapper,
        UserPairItemStyles.container,
      ]}>
      <View>
        <CustomText style={PairItemStyle.title}>
          {userPair.user.username}
        </CustomText>
        <CustomText>{userPair.user.email}</CustomText>
      </View>
      <View style={comp.flex} />
      <VisitState visit={userPair?.visit} />
      {checkUsersMode && <CustomCheckbox checked={true} />}
    </View>
  );
};
