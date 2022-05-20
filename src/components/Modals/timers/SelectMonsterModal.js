import React, {useEffect} from 'react';
import {CustomChoiceModal} from '../../common/modals/CustomModal';
import {FlatList} from 'react-native';
import {Monster} from '../../Items/timers/Monster';
import {Divider} from 'react-native-paper';

export const SelectMonsterModal = ({
  modal,
  setModal,
  monster,
  monsters,
  setMonster,
}) => {
  useEffect(() => {
    monsters?.length > 0 && !monster?.id && setMonster(monsters[0]);
  }, [monsters]);

  const onMonster = async monster => {
    setMonster(monster);
    setModal(false);
  };

  return (
    <CustomChoiceModal modal={modal} setModal={setModal}>
      <FlatList
        data={monsters}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({item}) => (
          <Monster item={item} monster={monster} onMonster={onMonster} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </CustomChoiceModal>
  );
};
