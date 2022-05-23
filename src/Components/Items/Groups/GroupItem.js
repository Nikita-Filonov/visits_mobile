import React from 'react';
import {Group} from '../../../Models/Group';
import {TouchableOpacity, View} from 'react-native';
import {PairItemStyle} from '../../../Styles/Items';
import {CustomText} from '../../Common/CustomText';
import {useThemes} from '../../../Providers/ThemeProvider';
import {useAuth} from '../../../Providers/AuthProvider';
import {usePermissions} from '../../../Providers/PermissionsProvider';
import {useUserPairs} from '../../../Providers/Pairs/UserPairsProvider';

type Props = {
  group: Group,
};
export const GroupItem = (props: Props) => {
  const {group} = props;
  const {theme} = useThemes();
  const {user} = useAuth();
  const {isAllowed} = usePermissions();
  const {getUserPairForLearner} = useUserPairs();

  const onView = () => {};

  return (
    <TouchableOpacity onPress={onView}>
      <View style={PairItemStyle.timeWrapper}>
        <CustomText style={PairItemStyle.title}>{group.name}</CustomText>
        {/*<PairItemMenu pair={pair} />*/}
      </View>
    </TouchableOpacity>
  );
};
