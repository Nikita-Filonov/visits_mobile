import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {CustomMenu} from '../../../common/menus/CustomMenu';
import {CustomMenuItem} from '../../../common/menus/CustomMenuItem';
import {navigate} from '../../../Navigation/RootNavigation';
import {setCreateMemberModal} from '../../../../Redux/Groups/groupsActions';
import {setGroupTimersCommentShown} from '../../../../Redux/GroupTimers/groupTimersActions';
import {useAlerts} from '../../../../providers/AlertsProvider';

const GroupTimersHeaderMenu = props => {
  const {t} = useTranslation();
  const {
    group,
    sortRef,
    setCreateMemberModal,
    commentShown,
    setGroupTimersCommentShown,
  } = props;
  const {setConfirmModal} = useAlerts();
  const [menu, setMenu] = useState(false);

  const onClose = () => setMenu(false);

  const onSettings = () => {
    onClose();
    navigate('GroupSettings');
  };
  const onSorting = () => {
    onClose();
    sortRef.current.snapTo(0);
  };
  const onInviteMember = () => {
    onClose();
    setCreateMemberModal(true);
  };
  const onHistory = () => {
    onClose();
    navigate('GroupHistory');
  };
  const onComment = () => {
    onClose();
    setGroupTimersCommentShown(!commentShown);
  };

  const onDescription = () => {
    onClose();
    setConfirmModal({
      content: {
        title: t('groups.settings.common.description'),
        description: group.description
          ? group.description
          : t('groups.timers.noDescription'),
      },
    });
  };
  const onMembers = () => {
    onClose();
    navigate('GroupSettingsMembers');
  };

  return (
    <React.Fragment>
      <CustomMenu menu={menu} setMenu={setMenu}>
        <CustomMenuItem
          onPress={onSorting}
          title={t('timers.headerMenu.sort')}
        />
        <CustomMenuItem
          onPress={onHistory}
          title={t('groups.timers.activityLog')}
        />
        <CustomMenuItem
          onPress={onMembers}
          title={t('groups.tableHeader.members')}
        />
        <CustomMenuItem
          onPress={onSettings}
          title={t('components.drawer.settings')}
        />
        <CustomMenuItem
          onPress={onDescription}
          title={t('groups.settings.common.description')}
        />
        <CustomMenuItem
          onPress={onInviteMember}
          title={t('groups.settings.members.addMember')}
        />
        <CustomMenuItem
          onPress={onComment}
          title={t(
            `timers.headerMenu.${
              commentShown ? 'hideComments' : 'showComments'
            }`,
          )}
        />
      </CustomMenu>
    </React.Fragment>
  );
};

const getState = state => ({
  group: state.groups.group,
  commentShown: state.groupTimers.commentShown,
});

export default connect(getState, {
  setCreateMemberModal,
  setGroupTimersCommentShown,
})(GroupTimersHeaderMenu);
