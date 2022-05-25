import React, {useEffect, useMemo, useState} from 'react';
import {ConfirmLayout} from '../../../Components/Layouts/ConfirmLayout';
import {connect} from 'react-redux';
import {useGroups} from '../../../Providers/Groups/GroupsProvider';
import type {Group} from '../../../Models/Group';
import UserPairGroupItem from '../../../Components/Items/Pairs/UserPairGroupItem';
import {ListSeparator} from '../../../Components/Common/ListSeparator';
import {Spinner} from '../../../Components/Common/Spinner';
import type {Pair} from '../../../Models/Pairs';
import {useUserPairs} from '../../../Providers/Pairs/UserPairsProvider';
import {goBack} from '../../../Components/Navigation/RootNavigation';
import {CustomFlatList} from '../../../Components/Common/CustomFlatList';
import {EmptyList} from '../../../Components/Blocks/EmptyList';

type Props = {
  pair: Pair,
  groups: Group[],
};

const CreateUserPairGroups = (props: Props) => {
  const {pair, groups} = props;
  const {load, getGroups} = useGroups();
  const {request, createUserPairGroups} = useUserPairs();
  const [selectedGroups, setSelectedGroups] = useState([]);

  useEffect(() => {
    (async () => await getGroups())();
  }, []);

  const isDisabled = useMemo(
    () => selectedGroups.length === 0,
    [selectedGroups],
  );

  const onSelectGroup = async (groupId: number, isSelected: boolean) =>
    isSelected
      ? setSelectedGroups(selectedGroups.filter(g => g !== groupId))
      : setSelectedGroups([...selectedGroups, groupId]);

  const onCreate = async () =>
    createUserPairGroups(pair.id, selectedGroups).then(() => goBack());

  return (
    <ConfirmLayout
      title={'Добавить группу студентов'}
      onConfirm={onCreate}
      loading={request}
      disabled={isDisabled}>
      {load ? (
        <Spinner />
      ) : (
        <CustomFlatList
          data={groups}
          renderItem={({item}) => (
            <UserPairGroupItem
              group={item}
              selectedGroups={selectedGroups}
              onSelectGroup={onSelectGroup}
            />
          )}
          ListEmptyComponent={
            <EmptyList
              title={'Тут пока нет групп на выбор'}
              description={
                'Перейдите в раздел "Группы", чтобы создать новую группу'
              }
            />
          }
          ItemSeparatorComponent={ListSeparator}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </ConfirmLayout>
  );
};

const getState = state => ({
  pair: state.pairs.pair,
  groups: state.groups.groups,
});
export default connect(getState, null)(CreateUserPairGroups);
