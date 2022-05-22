import React, {forwardRef} from 'react';
import {Dimensions} from 'react-native';
import {CustomBottomSheet} from './CustomBottomSheet';
import {BottomSheetItem} from './BottomSheetItem';
import {useUserPairs} from '../../../Providers/Pairs/UserPairsProvider';
import {connect} from 'react-redux';
import {UserPair} from '../../../Models/UserPair';
import {VISIT_STATES} from '../../../utils/Constants';
import {navigate} from '../../Navigation/RootNavigation';
import {VIEW_PAIR_ROUTE} from '../../../utils/Routes';

type Props = {
  userPair: UserPair,
};

const UserPairBottomSheet = forwardRef((props: Props, ref) => {
  const {userPair} = props;
  const {createVisit} = useUserPairs();

  const onClose = async () => ref.current.snapTo(2);

  const onSetVisit = (state: number) => async () => {
    await createVisit({
      userId: userPair.user.id,
      pairId: userPair.pair.id,
      state,
      when: new Date(),
    });
    await onClose();
  };

  const onViewVisits = async () => {
    navigate('UserPairVisits', {from: VIEW_PAIR_ROUTE});
    await onClose();
  };

  return (
    <CustomBottomSheet
      ref={ref}
      snapPoints={[Dimensions.get('window').height / 3, 200, 0]}>
      <BottomSheetItem
        title={'Отметить пропуск'}
        iconName={'account-remove-outline'}
        onPress={onSetVisit(VISIT_STATES.missedPair)}
      />
      <BottomSheetItem
        title={'На больничном'}
        iconName={'home-thermometer-outline'}
        onPress={onSetVisit(VISIT_STATES.onSickLeave)}
      />
      <BottomSheetItem
        title={'Посещения'}
        iconName={'format-list-checks'}
        onPress={onViewVisits}
      />
      <BottomSheetItem title={'Удалить из пары'} iconName={'delete-outline'} />
    </CustomBottomSheet>
  );
});

const getState = state => ({
  userPair: state.pairs.userPair,
});
export default connect(getState, null, null, {forwardRef: true})(
  UserPairBottomSheet,
);
