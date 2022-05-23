import React from 'react';
import {Group} from '../../../Models/Group';
import {TouchableOpacity, View} from 'react-native';
import {PairItemStyle} from '../../../Styles/Items';
import {CustomText} from '../../Common/CustomText';
import {navigate} from '../../Navigation/RootNavigation';
import {useThemes} from '../../../Providers/ThemeProvider';
import GroupItemMenu from '../../Common/Menus/Groups/GroupItemMenu';
import {comp} from '../../../Styles/Blocks';
import {connect} from 'react-redux';
import {setGroup} from '../../../Redux/Groups/groupsActions';

type Props = {
  group: Group,
  setGroupStore: (group: Group) => void,
};
const GroupItem = (props: Props) => {
  const {group, setGroupStore} = props;
  const {theme} = useThemes();

  const onView = () => {
    setGroupStore(group);
    navigate('ViewGroup', {isCreation: false});
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

export default connect(null, {setGroupStore: setGroup})(GroupItem);
