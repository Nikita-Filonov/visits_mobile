import React, {useMemo, useState} from 'react';
import {connect} from 'react-redux';
import {useSettings} from '../../../../providers/SettingsProvider';
import {useTranslation} from 'react-i18next';
import {navigate} from '../../../navigation/RootNavigation';
import {CustomMenu} from '../../../common/menus/CustomMenu';
import {CustomMenuItem} from '../../../common/menus/CustomMenuItem';
import {useThemes} from '../../../../providers/ThemeProvider';
import {setGroup} from '../../../../redux/Groups/groupsActions';

const GroupMenu = ({group, setGroup}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();
  const [menu, setMenu] = useState(false);
  const {settings, updateSettings} = useSettings();

  const onClose = () => setMenu(false);

  const isMuted = useMemo(() => settings.muted_groups.includes(group.id), [settings.muted_groups]);
  const onNotification = async () => {
    onClose();
    const mutedGroups = isMuted
      ? settings.muted_groups.filter(group_id => group_id !== group.id)
      : [...settings.muted_groups, group.id];
    await updateSettings({muted_groups: mutedGroups});
  };

  const onSettings = async () => {
    onClose();
    setGroup(group);
    navigate('GroupSettings');
  };

  return (
    <CustomMenu menu={menu} setMenu={setMenu} color={theme.text}>
      <CustomMenuItem onPress={onSettings} title={t('components.drawer.settings')}/>
      <CustomMenuItem
        onPress={onNotification}
        title={isMuted ? t('groups.enableNotifications') : t('groups.disableNotifications')}
      />
    </CustomMenu>
  );
};


export default connect(
  null,
  {
    setGroup,
  },
)(GroupMenu);
