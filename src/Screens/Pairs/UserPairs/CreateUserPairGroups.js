import React, {useEffect} from 'react';
import {ConfirmLayout} from '../../../Components/Layouts/ConfirmLayout';
import {connect} from 'react-redux';
import {useGroups} from '../../../Providers/Groups/GroupsProvider';
import type {Group} from '../../../Models/Group';
import {FlatList} from 'react-native';
import UserPairGroupItem from '../../../Components/Items/Pairs/UserPairGroupItem';
import {ListSeparator} from '../../../Components/Common/ListSeparator';
import {Spinner} from '../../../Components/Common/Spinner';

type Props = {
  navigation: any,
  groups: Group[],
};

const CreateUserPairGroups = (props: Props) => {
  const {groups} = props;
  const {load, getGroups} = useGroups();

  useEffect(() => {
    (async () => await getGroups())();
  }, []);

  const onCreate = async () => {};

  return (
    <ConfirmLayout title={'Добавить группу студентов'} onConfirm={onCreate}>
      {load ? (
        <Spinner />
      ) : (
        <FlatList
          data={groups}
          renderItem={({item}) => <UserPairGroupItem group={item} />}
          ItemSeparatorComponent={ListSeparator}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </ConfirmLayout>
  );
};

const getState = state => ({groups: state.groups.groups});
export default connect(getState, null)(CreateUserPairGroups);
