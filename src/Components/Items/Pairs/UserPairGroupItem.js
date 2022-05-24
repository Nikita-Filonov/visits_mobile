import React, {useMemo} from 'react';
import {Group} from '../../../Models/Group';
import {TouchableOpacity, View} from 'react-native';
import {PairItemStyle} from '../../../Styles/Items';
import {CustomText} from '../../Common/CustomText';
import {useThemes} from '../../../Providers/ThemeProvider';
import {comp} from '../../../Styles/Blocks';
import {connect} from 'react-redux';
import {CustomCheckbox} from '../../Common/Inputs/CustomCheckbox';

type Props = {
  group: Group,
  selectedGroups: Array<number>,
  onSelectGroup: (groupId: number, isSelected: boolean) => void,
};
const UserPairGroupItem = (props: Props) => {
  const {group, selectedGroups, onSelectGroup} = props;
  const {theme} = useThemes();

  const isSelected = useMemo(
    () => selectedGroups.indexOf(group.id) !== -1,
    [selectedGroups, group],
  );

  const onSelect = async () => await onSelectGroup(group.id, isSelected);

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        {backgroundColor: theme.listItem},
        PairItemStyle.container,
        PairItemStyle.wrapper,
      ]}>
      <CustomText style={PairItemStyle.title}>{group.name}</CustomText>
      <View style={comp.flex} />
      <CustomCheckbox checked={isSelected} onPress={onSelect} />
    </TouchableOpacity>
  );
};

export default connect(null, null)(UserPairGroupItem);
