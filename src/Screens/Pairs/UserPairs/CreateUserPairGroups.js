import React, {useEffect, useMemo, useState} from 'react';
import {ConfirmLayout} from '../../../Components/Layouts/ConfirmLayout';
import {connect} from 'react-redux';
import {useGroups} from '../../../Providers/Groups/GroupsProvider';
import type {Group} from '../../../Models/Group';
import {FlatList} from 'react-native';
import UserPairGroupItem from '../../../Components/Items/Pairs/UserPairGroupItem';
import {ListSeparator} from '../../../Components/Common/ListSeparator';
import {Spinner} from '../../../Components/Common/Spinner';
import type {Pair} from '../../../Models/Pairs';

type Props = {
  pair: Pair,
  groups: Group[],
};

const CreateUserPairGroups = (props: Props) => {
  const {pair, groups} = props;
  const {load, getGroups} = useGroups();
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

  const onCreate = async () => {};

  return (
    <ConfirmLayout
      title={'Добавить группу студентов'}
      onConfirm={onCreate}
      disabled={isDisabled}>
      {load ? (
        <Spinner />
      ) : (
        <FlatList
          data={groups}
          renderItem={({item}) => (
            <UserPairGroupItem
              group={item}
              selectedGroups={selectedGroups}
              onSelectGroup={onSelectGroup}
            />
          )}
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
