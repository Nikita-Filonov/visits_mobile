import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {CustomMenu} from '../../../common/menus/CustomMenu';
import {navigate} from '../../../navigation/RootNavigation';
import {CustomMenuItem} from '../../../common/menus/CustomMenuItem';
import {setTimersCommentShown} from '../../../../redux/Timers/timersActions';


const TimersHeaderMenu = ({sortRef, commentShown, setTimersCommentShown}) => {
  const {t} = useTranslation();
  const [menu, setMenu] = useState(false);

  const onClose = () => setMenu(false);

  const onSettings = () => {
    onClose();
    navigate('Settings');
  };
  const onSorting = () => {
    onClose();
    sortRef.current.snapTo(0);
  };

  const onComment = () => {
    onClose();
    setTimersCommentShown(!commentShown);
  };

  return (
    <React.Fragment>
      <CustomMenu menu={menu} setMenu={setMenu}>
        <CustomMenuItem onPress={onSorting} title={t('timers.headerMenu.sort')}/>
        <CustomMenuItem onPress={onSettings} title={t('components.drawer.settings')}/>
        <CustomMenuItem
          onPress={onComment}
          title={t(`timers.headerMenu.${commentShown ? 'hideComments' : 'showComments'}`)}
        />
      </CustomMenu>
    </React.Fragment>
  );
};

const getState = (state) => ({commentShown: state.timers.commentShown});

export default connect(
  getState,
  {
    setTimersCommentShown,
  },
)(TimersHeaderMenu);
