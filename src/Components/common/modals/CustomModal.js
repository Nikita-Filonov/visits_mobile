import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {useThemes} from '../../../Providers/ThemeProvider';
import {DefaultModalStyles} from '../../../Styles/Modals';

export const CustomChoiceModal = ({children, modal, setModal}) => {
  const {theme} = useThemes();

  const onClose = () => setModal(false);

  return (
    <Modal
      isVisible={modal}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      onDismiss={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={DefaultModalStyles.container}>
        <View
          style={[
            DefaultModalStyles.wrapper,
            {backgroundColor: theme.listItem},
          ]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};