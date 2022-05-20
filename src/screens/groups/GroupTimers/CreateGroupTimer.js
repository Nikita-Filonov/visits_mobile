import React from 'react';
import {ScrollView} from 'react-native';
import {comp} from '../../../styles/Blocks';
import {ConfirmLayout} from '../../../components/layouts/ConfirmLayout';
import {useTranslation} from 'react-i18next';
import {CustomText} from '../../../components/common/CustomText';
import {TimerTimePicker} from '../../../components/blocks/timers/TimerTimePicker';
import {TimerDatePicker} from '../../../components/blocks/timers/TimerDatePicker';
import {connect, useSelector} from 'react-redux';
import {MonsterSelect} from '../../../components/blocks/timers/MonsterSelect';
import {CommentSelect} from '../../../components/blocks/timers/CommentSelect';
import {TIMERS_INITIAL_STATE} from '../../../redux/Timers/initialState';
import {setGroupTimer} from '../../../redux/GroupTimers/groupTimersActions';
import {useTimerPayload} from '../../../utils/hooks/TimerHooks';
import {useGroupTimers} from '../../../providers/groups/GroupTimersProvider';
import AdMobBanner from 'react-native-admob/RNAdMobBanner';


const CreateGroupTimer = ({navigation, group, groupTimer, setGroupTimer}) => {
  const {t} = useTranslation();
  const {request, createEvent, updateGroupTimer} = useGroupTimers();
  const monsters = useSelector(state => state.groups.groupMonsters);
  const {toUpdatePayload, toCreatePayload} = useTimerPayload();

  const onBack = () => {
    navigation.goBack();
    setGroupTimer(TIMERS_INITIAL_STATE.timer);
  };

  const onUpdate = async () => {
    clearInterval(groupTimer.ref.current);
    await updateGroupTimer(group.id, groupTimer.id, toUpdatePayload(groupTimer));
  };

  const onCreate = async () => (groupTimer?.editMode ? onUpdate() : createEvent(group.id, toCreatePayload(groupTimer)))
    .then(() => onBack());


  const onMonster = (monster) => setGroupTimer({...groupTimer, monster});
  const onKilled = (killed) => setGroupTimer({...groupTimer, killed});
  const onComment = (comment) => setGroupTimer({...groupTimer, comment});

  return (
    <ConfirmLayout
      onBack={onBack}
      loading={request}
      onConfirm={onCreate}
      title={t(`timers.createTimerModal.${groupTimer?.editMode ? 'editTitle' : 'createTitle'}`)}
      disabled={!groupTimer?.monster?.id}
    >
      <ScrollView>
        {!groupTimer?.editMode && <CustomText style={comp.normalText}>
          {t('timers.createTimerModal.description')}
        </CustomText>}
        <TimerDatePicker value={groupTimer?.killed} onChange={onKilled}/>
        <TimerTimePicker value={groupTimer?.killed} onChange={onKilled}/>
        <MonsterSelect
          monsters={monsters}
          alertText={t('groups.timers.createTimer.alert')}
          monster={groupTimer?.monster}
          setMonster={onMonster}
        />
        <CommentSelect comment={groupTimer?.comment} setComment={onComment}/>
      </ScrollView>
      <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-1094213860762666/3310554469"
        testDevices={[AdMobBanner.simulatorId]}
      />
    </ConfirmLayout>
  );
};

const getState = (state) => ({
  group: state.groups.group,
  groupTimer: state.groupTimers.groupTimer,
});

export default connect(
  getState,
  {
    setGroupTimer,
  },
)(CreateGroupTimer);
