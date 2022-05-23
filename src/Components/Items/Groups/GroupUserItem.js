import React from 'react';
import {View} from 'react-native';
import {PairItemStyle} from '../../../Styles/Items';
import {CustomText} from '../../Common/CustomText';
import {useThemes} from '../../../Providers/ThemeProvider';
import {comp} from '../../../Styles/Blocks';
import type {GroupUser} from '../../../Models/GroupUser';
import {GroupUserItemMenu} from '../../Common/Menus/Groups/GroupUserItemMenu';

type Props = {
  groupUser: GroupUser,
};

export const GroupUserItem = (props: Props) => {
  const {groupUser} = props;
  const {theme} = useThemes();

  return (
    <View
      style={[
        {backgroundColor: theme.listItem},
        PairItemStyle.container,
        PairItemStyle.wrapper,
      ]}>
      <View style={PairItemStyle.nameWrapper}>
        <CustomText style={PairItemStyle.title}>
          {groupUser.user.username}
        </CustomText>
        <CustomText>{groupUser.user.email}</CustomText>
      </View>
      <View style={comp.flex} />
      <GroupUserItemMenu groupUser={groupUser} />
    </View>
  );
};
