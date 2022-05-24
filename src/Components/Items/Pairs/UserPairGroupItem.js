import React from 'react';
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
};
const UserPairGroupItem = (props: Props) => {
  const {group} = props;
  const {theme} = useThemes();

  const onView = () => {};

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
      <CustomCheckbox />
    </TouchableOpacity>
  );
};

export default connect(null, null)(UserPairGroupItem);
