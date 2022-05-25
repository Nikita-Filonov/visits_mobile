import React, {forwardRef, useMemo} from 'react';
import {Dimensions} from 'react-native';
import {CustomBottomSheet} from './CustomBottomSheet';
import {BottomSheetItem} from './BottomSheetItem';
import {useUserPairs} from '../../../Providers/Pairs/UserPairsProvider';
import {connect} from 'react-redux';
import {UserPair} from '../../../Models/UserPair';
import {VISIT_STATES} from '../../../Utils/Constants';
import {navigate} from '../../Navigation/RootNavigation';
import {useAlerts} from '../../../Providers/AlertsProvider';

type Props = {
  userPair: UserPair,
};

const UserPairBottomSheet = forwardRef((props: Props, ref) => {
  const {userPair} = props;
  const {createVisit, deleteUserPair} = useUserPairs();
  const {setConfirmModal} = useAlerts();

  const bottomSheerHeight = useMemo(
    () => Dimensions.get('window').height / 2.45,
    [],
  );

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
    navigate('UserPairVisits');
    await onClose();
  };

  const onDelete = async () =>
    setConfirmModal({
      action: async () => {
        await deleteUserPair(userPair.id);
        await onClose();
      },
      modal: true,
      content: {
        title: 'Удалить студента',
        description:
          'Вы действительно хотите удалить студента из пары? Отменить это действие будет невозможно',
        confirmButton: 'Удалить',
      },
    });

  return (
    <CustomBottomSheet
      ref={ref}
      height={bottomSheerHeight}
      snapPoints={[bottomSheerHeight, 200, 0]}>
      <BottomSheetItem
        title={'Был на паре'}
        iconName={'account-check-outline'}
        onPress={onSetVisit(VISIT_STATES.wasOnPair)}
      />
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
      <BottomSheetItem
        title={'Удалить из пары'}
        iconName={'delete-outline'}
        onPress={onDelete}
      />
    </CustomBottomSheet>
  );
});

const getState = state => ({
  userPair: state.pairs.userPair,
});
export default connect(getState, null, null, {forwardRef: true})(
  UserPairBottomSheet,
);
