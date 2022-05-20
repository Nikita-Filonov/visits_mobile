import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {CustomMenu} from '../../../common/menus/CustomMenu';
import {CustomMenuItem} from '../../../common/menus/CustomMenuItem';
import {AskQuestionModal} from '../../../modals/help/AskQuestionModal';

export const HelpHeaderMenu = () => {
  const {t} = useTranslation();
  const [menu, setMenu] = useState(false);
  const [askQuestionModal, setAskQuestionModal] = useState(false);

  const onClose = () => setMenu(false);

  const onAskQuestion = () => {
    onClose();
    setAskQuestionModal(true);
  };

  return (
    <React.Fragment>
      <CustomMenu menu={menu} setMenu={setMenu} color={'#FFFFFF'}>
        <CustomMenuItem onPress={onAskQuestion} title={t('help.askQuestion')}/>
      </CustomMenu>
      <AskQuestionModal modal={askQuestionModal} setModal={setAskQuestionModal}/>
    </React.Fragment>
  );
};


