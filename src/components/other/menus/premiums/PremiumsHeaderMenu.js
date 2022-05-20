import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {CustomMenu} from '../../../common/menus/CustomMenu';
import {CustomMenuItem} from '../../../common/menus/CustomMenuItem';
import {navigate} from '../../../navigation/RootNavigation';

export const PremiumsHeaderMenu = () => {
  const {t} = useTranslation();
  const [menu, setMenu] = useState(false);

  const onClose = () => setMenu(false);

  const onMyPremiums = () => {
    onClose();
    navigate('ProfileSettings', {screen: 'MyPremiums'});
  };

  const onPremiumsInfo = () => {
    onClose();
    navigate('PremiumsInfo');
  };

  return (
    <CustomMenu menu={menu} setMenu={setMenu} color={'#FFFFFF'}>
      <CustomMenuItem onPress={onMyPremiums} title={t('profile.sidebar.myPremiums')}/>
      <CustomMenuItem onPress={onPremiumsInfo} title={t('premiums.moreDetails')}/>
    </CustomMenu>
  );
};



