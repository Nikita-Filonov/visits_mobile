import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {CustomMenu} from '../../../common/menus/CustomMenu';
import {CustomMenuItem} from '../../../common/menus/CustomMenuItem';
import {useThemes} from '../../../../providers/ThemeProvider';
import {useSettings} from '../../../../providers/SettingsProvider';
import {useAlerts} from '../../../../providers/AlertsProvider';
import {setMonster} from '../../../../redux/Settings/settingsActions';
import {convertTime} from '../../../../utils/Utils';
import {navigate} from '../../../navigation/RootNavigation';

const MonsterMenu = ({monster, setMonster}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();
  const {setConfirmModal} = useAlerts();
  const {deleteMonster} = useSettings();
  const [menu, setMenu] = useState(false);

  const onClose = () => setMenu(false);

  const onEdit = async () => {
    onClose();
    setMonster({...monster, delta: convertTime(monster?.delta), editMode: true});
    navigate('CreateMonster');
  };

  const onDelete = async () => {
    onClose();
    setConfirmModal({
      action: async () => await deleteMonster(monster?.id),
      content: {...t('settings.monsters.deleteMonsterModal'), confirmButton: t('common.delete')},
    });
  };

  return (
    <CustomMenu menu={menu} setMenu={setMenu} color={theme.text}>
      <CustomMenuItem onPress={onEdit} title={t('common.change')}/>
      <CustomMenuItem onPress={onDelete} title={t('common.delete')}/>
    </CustomMenu>
  );
};


export default connect(
  null,
  {
    setMonster,
  },
)(MonsterMenu);
