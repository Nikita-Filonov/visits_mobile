import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {PairItemStyle} from '../../../Styles/Items';
import {CustomText} from '../../Common/CustomText';
import {navigate} from '../../Navigation/RootNavigation';
import {VIEW_PAIR_ROUTE} from '../../../Utils/Routes';
import {useThemes} from '../../../Providers/ThemeProvider';
import GroupItemMenu from '../../Common/Menus/Groups/GroupItemMenu';
import {comp} from '../../../Styles/Blocks';
import type {GroupUser} from '../../../Models/GroupUser';

type Props = {
  groupUser: GroupUser,
};

export const GroupUserItem = (props: Props) => {
  const {groupUser} = props;
  const {theme} = useThemes();

  const onView = () => {
    navigate(VIEW_PAIR_ROUTE, {isCreation: false});
  };

  return (
    <TouchableOpacity
      onPress={onView}
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
      <GroupItemMenu group={group} />
    </TouchableOpacity>
  );
};
