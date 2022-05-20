import React from 'react';
import {ScrollView} from 'react-native';
import {useTimers} from '../../providers/timers/TimersProvider';
import {comp} from '../../styles/Blocks';
import {useSettings} from '../../providers/SettingsProvider';
import {ConfirmLayout} from '../../components/layouts/ConfirmLayout';
import {useTranslation} from 'react-i18next';
import {CustomText} from '../../components/common/CustomText';
import {TimerTimePicker} from '../../components/blocks/timers/TimerTimePicker';
import {TimerDatePicker} from '../../components/blocks/timers/TimerDatePicker';
import {connect} from 'react-redux';
import {setTimer} from '../../redux/Timers/timersActions';
import {MonsterSelect} from '../../components/blocks/timers/MonsterSelect';
import {CommentSelect} from '../../components/blocks/timers/CommentSelect';
import {TIMERS_INITIAL_STATE} from '../../redux/Timers/initialState';
import {useTimerPayload} from '../../utils/hooks/TimerHooks';
import AdMobBanner from 'react-native-admob/RNAdMobBanner';


const CreateTimer = ({navigation, timer, setTimer}) => {
  const {t} = useTranslation();
  const {request, createEvent, updateEvent} = useTimers();
  const {settings} = useSettings();
  const {toUpdatePayload, toCreatePayload} = useTimerPayload();

  const onBack = () => {
    navigation.goBack();
    setTimer(TIMERS_INITIAL_STATE.timer);
  };

  const onUpdate = async () => {
    clearInterval(timer.ref.current);
    await updateEvent(timer.id, toUpdatePayload(timer));
  };

  const onCreate = async () => (timer?.editMode ? onUpdate() : createEvent(toCreatePayload(timer)))
    .then(() => onBack());

  const onMonster = (monster) => setTimer({...timer, monster});
  const onKilled = (killed) => setTimer({...timer, killed});
  const onComment = (comment) => setTimer({...timer, comment});

  return (
    <ConfirmLayout
      onBack={onBack}
      loading={request}
      onConfirm={onCreate}
      title={t(`timers.createTimerModal.${timer?.editMode ? 'editTitle' : 'createTitle'}`)}
      disabled={!timer?.monster?.id}
    >
      <ScrollView>
        {!timer?.editMode && <CustomText style={comp.normalText}>
          {t('timers.createTimerModal.description')}
        </CustomText>}
        <TimerDatePicker value={timer?.killed} onChange={onKilled}/>
        <TimerTimePicker value={timer?.killed} onChange={onKilled}/>
        <MonsterSelect
          monsters={settings?.monsters}
          alertText={t('timers.createTimerModal.alert')}
          monster={timer?.monster}
          setMonster={onMonster}
        />
        <CommentSelect comment={timer?.comment} setComment={onComment}/>
      </ScrollView>
      <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-1094213860762666/6730924724"
        testDevices={[AdMobBanner.simulatorId]}
      />
    </ConfirmLayout>
  );
};

const getState = (state) => ({timer: state.timers.timer});

export default connect(
  getState,
  {
    setTimer,
  },
)(CreateTimer);
