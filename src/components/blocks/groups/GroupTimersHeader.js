import React, {memo} from 'react';
import {Appbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {AppBar} from '../../common/AppBar';
import GroupTimersHeaderMenu from '../../other/menus/groups/GroupTimers/GroupTimersHeaderMenu';
import {navigate} from '../../navigation/RootNavigation';
import {AppBarBack} from '../../common/AppBarBack';

const GroupTimersHeader = ({group, sortRef}) => {
  const onBack = () => navigate('Groups');

  return (
    <AppBar>
      <AppBarBack onBack={onBack}/>
      <Appbar.Content title={group?.title}/>
      <GroupTimersHeaderMenu sortRef={sortRef}/>
    </AppBar>
  );
};


const getState = (state) => ({group: state.groups.group});

export default connect(
  getState,
  null,
  null,
  {forwardRef: true},
)(memo(GroupTimersHeader));
