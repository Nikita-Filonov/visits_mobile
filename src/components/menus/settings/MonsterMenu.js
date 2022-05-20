import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {CustomMenu} from '../../common/menus/CustomMenu';
import {CustomMenuItem} from '../../common/menus/CustomMenuItem';
import {useThemes} from '../../../Providers/ThemeProvider';
import {useSettings} from '../../../Providers/SettingsProvider';
import {useAlerts} from '../../../Providers/AlertsProvider';
import {setMonster} from '../../../Redux/Settings/settingsActions';
import {convertTime} from '../../../utils/Utils';
import {navigate} from '../../Navigation/RootNavigation';

const MonsterMenu = ({monster, setMonster}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();
  const {setConfirmModal} = useAlerts();
  const {deleteMonster} = useSettings();
  const [menu, setMenu] = useState(false);

  const onClose = () => setMenu(false);

  const onEdit = async () => {
    onClose();
    setMonster({
      ...monster,
      delta: convertTime(monster?.delta),
      editMode: true,
    });
    navigate('CreateMonster');
  };

  const onDelete = async () => {
    onClose();
    setConfirmModal({
      action: async () => await deleteMonster(monster?.id),
      content: {
        ...t('settings.monsters.deleteMonsterModal'),
        confirmButton: t('common.delete'),
      },
    });
  };

  return (
    <CustomMenu menu={menu} setMenu={setMenu} color={theme.text}>
      <CustomMenuItem onPress={onEdit} title={t('common.change')} />
      <CustomMenuItem onPress={onDelete} title={t('common.delete')} />
    </CustomMenu>
  );
};

export default connect(null, {
  setMonster,
})(MonsterMenu);
