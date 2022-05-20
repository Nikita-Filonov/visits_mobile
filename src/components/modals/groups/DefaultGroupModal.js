import React, {useEffect, useState} from 'react';
import {FullScreenModal} from '../../common/modals/FullScreenModal';
import {FullScreenModalConfirmLayout} from '../../layouts/FullScreenModalConfirmLayout';
import {connect} from 'react-redux';
import {setDefaultGroupModal} from '../../../redux/Groups/groupsActions';
import {View} from 'react-native';
import {comp} from '../../../styles/Blocks';
import {CustomText} from '../../common/CustomText';
import {FlatList} from 'react-native-gesture-handler';
import {DefaultGroupItem} from '../../items/groups/DefaultGroupItem';
import {ListSeparator} from '../../common/ListSeparator';
import AsyncStorage from '@react-native-community/async-storage';
import {DEFAULT_GROUP_BACKUP} from '../../../utils/Constants';

const NON_SELECT_GROUP = {
  id: null,
  title: 'Не выбирать группу',
};

const DefaultGroupModal = ({groups, defaultGroupModal, setDefaultGroupModal}) => {
  const [defaultGroup, setDefaultGroup] = useState(NON_SELECT_GROUP);

  const onClose = () => setDefaultGroupModal(false);

  useEffect(() => {
    (async () => {
      const defaultGroup = JSON.parse(await AsyncStorage.getItem(DEFAULT_GROUP_BACKUP));
      defaultGroup?.id && setDefaultGroup(defaultGroup);
    })();
  }, []);

  const onSelect = async (group) => {
    setDefaultGroup(group);
    await AsyncStorage.setItem(DEFAULT_GROUP_BACKUP, JSON.stringify(group));
  };

  return (
    <FullScreenModal modal={defaultGroupModal} setModal={setDefaultGroupModal}>
      <FullScreenModalConfirmLayout title={'Группа по умолчанию'} onClose={onClose}>
        <CustomText>
          Вы можете выбрать группу, которая будет автоматически открываться при загрзке приложения
        </CustomText>

        <FlatList
          ListHeaderComponent={() => <View style={{marginBottom: 10}}>
            <DefaultGroupItem item={NON_SELECT_GROUP} defaultGroup={defaultGroup} onSelect={onSelect}/>
          </View>}
          style={[comp.input, comp.bottomList]}
          data={groups}
          renderItem={({item}) => <DefaultGroupItem item={item} defaultGroup={defaultGroup} onSelect={onSelect}/>}
          removeClippedSubviews={true}
          keyExtractor={(item) => `${item.id}`}
          ItemSeparatorComponent={ListSeparator}
        />
      </FullScreenModalConfirmLayout>
    </FullScreenModal>
  );
};

const getState = (state) => ({
  groups: state.groups.groups,
  defaultGroupModal: state.groups.defaultGroupModal,
});

export default connect(
  getState,
  {
    setDefaultGroupModal,
  },
)(DefaultGroupModal);
