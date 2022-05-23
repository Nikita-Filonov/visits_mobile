import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {CustomText} from '../../Common/CustomText';
import {useThemes} from '../../../Providers/ThemeProvider';
import {formatPairTime} from '../../../Utils/Helpers/Formatters';
import {PairItemStyle} from '../../../Styles/Items';
import {navigate} from '../../Navigation/RootNavigation';
import {connect} from 'react-redux';
import {setPair} from '../../../Redux/Pairs/pairsActions';
import {usePermissions} from '../../../Providers/PermissionsProvider';
import {
  VIEW_PAIR_AS_INSTRUCTOR,
  VIEW_PAIR_AS_LERNER,
} from '../../../Utils/Helpers/Permissions';
import {useUserPairs} from '../../../Providers/Pairs/UserPairsProvider';
import {useAuth} from '../../../Providers/AuthProvider';
import {USER_PAIR_VISITS_ROUTE, VIEW_PAIR_ROUTE} from '../../../Utils/Routes';
import PairItemMenu from '../../Common/Menus/Pairs/PairItemMenu';
import {comp} from '../../../Styles/Blocks';

const PairItem = ({pair, setPairStore}) => {
  const {theme} = useThemes();
  const {user} = useAuth();
  const {isAllowed} = usePermissions();
  const {getUserPairForLearner} = useUserPairs();

  const onView = useCallback(async () => {
    if (isAllowed(VIEW_PAIR_AS_INSTRUCTOR)) {
      setPairStore(pair);
      navigate(VIEW_PAIR_ROUTE, {isCreation: false});
      return;
    }

    if (isAllowed(VIEW_PAIR_AS_LERNER)) {
      (await getUserPairForLearner(pair.id, user.id)) &&
        navigate(USER_PAIR_VISITS_ROUTE);
    }
  }, [pair, setPairStore]);

  return (
    <TouchableOpacity
      onPress={onView}
      style={[
        {backgroundColor: theme.listItem},
        PairItemStyle.container,
        PairItemStyle.wrapper,
      ]}>
      <View style={PairItemStyle.timeWrapper}>
        <CustomText style={PairItemStyle.title}>
          {pair.startAt ? formatPairTime(pair.startAt) : '--:--'}
        </CustomText>
        <CustomText>
          {pair.startAt ? formatPairTime(pair.endAt) : '--:--'}
        </CustomText>
      </View>
      <View
        style={[{backgroundColor: theme.button.primary}, PairItemStyle.divider]}
      />
      <View style={PairItemStyle.nameWrapper}>
        <CustomText style={PairItemStyle.title}>{pair.name}</CustomText>
        <CustomText>{pair.room}</CustomText>
      </View>
      <View style={comp.flex} />
      <PairItemMenu pair={pair} />
    </TouchableOpacity>
  );
};

export default connect(null, {setPairStore: setPair})(PairItem);
