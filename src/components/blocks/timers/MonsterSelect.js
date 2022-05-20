import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {Image, TouchableOpacity} from 'react-native';
import {TextField} from '../../common/inputs/TextField';
import {Trans, useTranslation} from 'react-i18next';
import {AlertMessage} from '../../common/AlertMessage';
import {SelectMonsterModal} from '../../modals/timers/SelectMonsterModal';
import {MonsterStyles} from '../../../styles/Items';
import {CreateTimerStyles} from '../../../styles/Screens';
import {Link} from '../../common/Link';
import {navigate} from '../../navigation/RootNavigation';

export const MonsterSelect = ({monster, setMonster, monsters, alertText}) => {
  const {t} = useTranslation();
  const [selectMonsterModal, setSelectMonsterModal] = useState(false);

  const onSelectMonster = () => setSelectMonsterModal(true);
  const onSettings = () => navigate('Settings', {screen: 'MonstersSettings'});

  return (
    <React.Fragment>
      {monsters?.length === 0
        ? <AlertMessage
          level={'info'}
          message={<Trans defaults={alertText} components={[<Link onPress={onSettings}/>]}/>}
          style={{marginBottom: 15}}
        />
        : <TouchableOpacity onPress={onSelectMonster}>
          <TextField
            style={CreateTimerStyles.inputWrapper}
            value={monster?.name}
            editable={false}
            label={t('timers.createTimerModal.monstersSelectLabel')}
            left={
              <TextInput.Icon name={() =>
                <Image source={{uri: monster?.image, cache: 'force-cache'}} style={MonsterStyles.image}/>}
              />
            }
          />
        </TouchableOpacity>
      }
      <SelectMonsterModal
        modal={selectMonsterModal}
        setModal={setSelectMonsterModal}
        monster={monster}
        monsters={monsters}
        setMonster={setMonster}
      />
    </React.Fragment>
  );
};
