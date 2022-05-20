import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {CustomMenu} from '../../common/menus/CustomMenu';
import {CustomMenuItem} from '../../common/menus/CustomMenuItem';
import {useThemes} from '../../../Providers/ThemeProvider';
import {useSettings} from '../../../Providers/SettingsProvider';
import {useAlerts} from '../../../Providers/AlertsProvider';
import {setComment} from '../../../Redux/Settings/settingsActions';
import {navigate} from '../../Navigation/RootNavigation';

const CommentMenu = ({comment, setComment}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();
  const {setConfirmModal} = useAlerts();
  const {updateSettings, settings} = useSettings();
  const [menu, setMenu] = useState(false);

  const onClose = () => setMenu(false);

  const onEdit = async () => {
    onClose();
    setComment({...comment, editMode: true});
    navigate('CreateComment');
  };

  const onDelete = () => {
    onClose();
    setConfirmModal({
      action: async () =>
        await updateSettings({
          comments: settings.comments.filter(c => c.id !== comment.id),
        }),
      content: {
        ...t('settings.comments.deleteCommentModal'),
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
  setComment,
})(CommentMenu);
