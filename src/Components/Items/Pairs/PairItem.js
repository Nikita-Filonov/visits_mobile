import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {CustomText} from '../../common/CustomText';
import {useThemes} from '../../../Providers/ThemeProvider';
import {formatPairTime} from '../../../utils/Helpers/Formatters';
import {PairItemStyle} from '../../../Styles/Items';
import {navigate} from '../../Navigation/RootNavigation';
import {connect} from 'react-redux';
import {setPair} from '../../../Redux/Pairs/pairsActions';

const PairItem = ({pair, setPairStore}) => {
  const {theme} = useThemes();

  const onView = useCallback(async () => {
    setPairStore(pair);
    navigate('ViewPair', {isCreation: false});
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
