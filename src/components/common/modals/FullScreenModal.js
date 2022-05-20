import React from 'react';
import {Modal, View} from 'react-native';
import {useThemes} from '../../../providers/ThemeProvider';
import {DefaultModalStyles} from '../../../Styles/Modals';

export const FullScreenModal = ({children, modal, setModal, onClose}) => {
  const {theme} = useThemes();

  const onSafeClose = () => (onClose ? onClose() : setModal(false));

  return (
    <Modal
      visible={modal}
      animated={true}
      animationType={'slide'}
      onRequestClose={onSafeClose}
      onDismiss={onSafeClose}
      style={DefaultModalStyles.modalFullScreen}>
      <View style={[DefaultModalStyles.container]}>
        <View
          style={[
            DefaultModalStyles.fullWrapper,
            {backgroundColor: theme.listItem},
          ]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};
