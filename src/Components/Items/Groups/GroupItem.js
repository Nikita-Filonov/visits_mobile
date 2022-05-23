import React from 'react';
import {Group} from '../../../Models/Group';
import {TouchableOpacity, View} from 'react-native';
import {PairItemStyle} from '../../../Styles/Items';
import {CustomText} from '../../Common/CustomText';
import {navigate} from '../../Navigation/RootNavigation';
import {VIEW_PAIR_ROUTE} from '../../../Utils/Routes';
import {useThemes} from '../../../Providers/ThemeProvider';
import GroupItemMenu from '../../Common/Menus/Groups/GroupItemMenu';
import {comp} from '../../../Styles/Blocks';

type Props = {
  group: Group,
};
export const GroupItem = (props: Props) => {
  const {group} = props;
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
      <CustomText style={PairItemStyle.title}>{group.name}</CustomText>
      <View style={comp.flex} />
      <GroupItemMenu group={group} />
    </TouchableOpacity>
  );
};
