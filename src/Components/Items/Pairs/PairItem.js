import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {CustomText} from '../../Common/CustomText';
import {useThemes} from '../../../Providers/ThemeProvider';
import {formatPairTime} from '../../../utils/Helpers/Formatters';
import {PairItemStyle} from '../../../Styles/Items';
import {navigate} from '../../Navigation/RootNavigation';
import {connect} from 'react-redux';
import {setPair} from '../../../Redux/Pairs/pairsActions';
import {usePermissions} from '../../../Providers/PermissionsProvider';
import {
  VIEW_PAIR_AS_INSTRUCTOR,
  VIEW_PAIR_AS_LERNER,
} from '../../../utils/Helpers/Permissions';
import {useUserPairs} from '../../../Providers/Pairs/UserPairsProvider';
import {useAuth} from '../../../Providers/AuthProvider';

const PairItem = ({pair, setPairStore}) => {
  const {theme} = useThemes();
  const {user} = useAuth();
  const {isAllowed} = usePermissions();
  const {getUserPairs} = useUserPairs();

  const onView = useCallback(async () => {
    if (isAllowed(VIEW_PAIR_AS_INSTRUCTOR)) {
      setPairStore(pair);
      navigate('ViewPair', {isCreation: false});
      return;
    }

    if (isAllowed(VIEW_PAIR_AS_LERNER)) {
      (await getUserPairs(pair.id, user.id)) && navigate('UserPairVisits');
    }
  }, [pair, setPairStore]);

  return (
    <TouchableOpacity
      onPress={onView}
      style={[{backgroundColor: theme.listItem}, PairItemStyle.container]}>
      <View style={PairItemStyle.wrapper}>
        <View style={PairItemStyle.timeWrapper}>
          <CustomText style={PairItemStyle.title}>
            {formatPairTime(pair.startAt)}
          </CustomText>
          <CustomText>{formatPairTime(pair.endAt)}</CustomText>
        </View>
        <View
          style={[
            {backgroundColor: theme.button.primary},
            PairItemStyle.divider,
          ]}
        />
        <View style={PairItemStyle.nameWrapper}>
          <CustomText style={PairItemStyle.title}>{pair.name}</CustomText>
          <CustomText>{pair.room}</CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default connect(null, {setPairStore: setPair})(PairItem);
