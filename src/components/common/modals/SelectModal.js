import React, {useCallback} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useThemes} from '../../../providers/ThemeProvider';
import {CustomChoiceModal} from './CustomModal';
import {ListSeparator} from '../ListSeparator';

export const SelectModal = ({modal, setModal, selectedItem, choices, setItem, renderItem}) => {
  const {theme} = useThemes();

  const onItem = async (item) => {
    setItem(item);
    setModal(false);
  };

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  return (
    <CustomChoiceModal modal={modal} setModal={setModal}>
      <FlatList
        data={choices}
        ItemSeparatorComponent={ListSeparator}
        renderItem={({item, index}) =>
          <TouchableOpacity
            onPress={() => onItem(item)}
            style={{backgroundColor: item?.id === selectedItem?.id && theme.listItemSelected, borderRadius: 5}}
          >
            {React.createElement(renderItem, {item, index})}
          </TouchableOpacity>
        }
        keyExtractor={keyExtractor}
      />
    </CustomChoiceModal>
  );
};
