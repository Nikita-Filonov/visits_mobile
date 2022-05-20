import React from 'react';
import {ConfirmLayout} from '../../../components/layouts/ConfirmLayout';
import {connect} from 'react-redux';
import {setMonster} from '../../../redux/Settings/settingsActions';
import {useTranslation} from 'react-i18next';
import {useSettings} from '../../../providers/SettingsProvider';
import {parseInterval, validateInterval} from '../../../utils/Utils';
import {CustomText} from '../../../components/common/CustomText';
import {comp} from '../../../styles/Blocks';
import {TextField} from '../../../components/common/inputs/TextField';
import {CreateTimerStyles} from '../../../styles/Screens';
import TextInputMask from 'react-native-masked-text/lib/text-input-mask';
import {SETTINGS_INITIAL_STATE} from '../../../redux/Settings/initialState';

const CreateMonster = ({navigation, monster, setMonster}) => {
  const {t} = useTranslation();
  const {request, createMonster, updateMonster} = useSettings();

  const onBack = () => {
    navigation.goBack();
    setMonster(SETTINGS_INITIAL_STATE.monster);
  };

  const onCreate = async () => {
    const payload = {...monster, delta: parseInterval(monster?.delta)};
    (monster?.editMode ? updateMonster(monster.id, payload) : createMonster(payload))
      .then(() => onBack());
  };

  return (
    <ConfirmLayout
      loading={request}
      onBack={onBack}
      onConfirm={onCreate}
      disabled={monster?.name?.length === 0 || !validateInterval(monster?.delta)}
      title={t(`settings.monsters.createMonsterModal.${monster?.editMode ? 'editTitle' : 'createTitle'}`)}
    >
      {!monster?.editMode && <CustomText style={comp.normalText}>
        {t('settings.monsters.createMonsterModal.description')}
      </CustomText>}
      <TextField
        style={comp.input}
        label={t('settings.monsters.createMonsterModal.nameInputLabel')}
        value={monster?.name}
        onChangeText={name => setMonster({...monster, name})}
      />
      <TextField
        style={comp.input}
        value={monster?.image}
        label={t('settings.monsters.createMonsterModal.imageInputLabel')}
        placeholder={'https://some.domain.com/my_image.png'}
        onChangeText={image => setMonster({...monster, image})}
      />
      <TextField
        keyboardType="numeric"
        value={monster?.delta?.toString()}
        onChangeText={delta => setMonster({...monster, delta})}
        style={[CreateTimerStyles.inputWrapper, comp.input]}
        label={t('settings.monsters.createMonsterModal.deltaInputLabel')}
        placeholder={'02:15'}
        maxLength={5}
        render={props => <TextInputMask {...props} type={'datetime'} options={{format: '99:99'}}/>}
        error={t('settings.monsters.createMonsterModal.deltaExample')}
        helpTextType={'info'}
      />
    </ConfirmLayout>
  );
};

const getState = (state) => ({monster: state.settings.monster});

export default connect(getState, {setMonster})(CreateMonster);
