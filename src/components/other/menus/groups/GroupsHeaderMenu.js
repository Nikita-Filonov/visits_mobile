import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {CustomMenu} from '../../../common/menus/CustomMenu';
import {CustomMenuItem} from '../../../common/menus/CustomMenuItem';
import {setDefaultGroupModal} from '../../../../redux/Groups/groupsActions';

const GroupsHeaderMenu = ({setDefaultGroupModal}) => {
  const {t} = useTranslation();
  const [menu, setMenu] = useState(false);

  const onClose = () => setMenu(false);

  const onDefaultGroup = () => {
    onClose();
    setDefaultGroupModal(true);
  };

  return (
    <CustomMenu menu={menu} setMenu={setMenu} color={'#FFFFFF'}>
      <CustomMenuItem onPress={onDefaultGroup} title={t('groups.headerMenu.defaultGroup')}/>
    </CustomMenu>
  );
};


export default connect(null, {setDefaultGroupModal})(GroupsHeaderMenu);


