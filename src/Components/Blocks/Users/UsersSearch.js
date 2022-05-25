import React, {useEffect, useState} from 'react';
import {useAuth} from '../../../Providers/AuthProvider';
import {FlatList} from 'react-native';
import type {User} from '../../../Models/User';
import {UsersSearchTextField} from '../../Common/Inputs/UsersSearchTextField';
import {SearchUserItem} from '../../Items/Users/SearchUserItem';

type Props = {
  selectedUsers: User[],
  setSelectedUsers: (users: User[]) => void,
};

export const UsersSearch = (props: Props) => {
  const {selectedUsers, setSelectedUsers} = props;
  const {getUsersQuery} = useAuth();
  const [loadUsers, setLoadUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [emailOrUsername, setEmailOrUsername] = useState('');

  useEffect(() => {
    setLoadUsers(true);
    const timeout = setTimeout(async () => {
      const usersQuery = await getUsersQuery(
        emailOrUsername,
        emailOrUsername,
        15,
      );
      setUsers(usersQuery);
      setLoadUsers(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [emailOrUsername]);

  useEffect(() => console.log(users), [users]);

  const onSelectUser = async (user: User) => {
    setUsers([]);
    setEmailOrUsername('');
    setSelectedUsers([...selectedUsers, user]);
  };

  const onRemoveUser = async (user: User) =>
    setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));

  return (
    <React.Fragment>
      <UsersSearchTextField
        loading={loadUsers}
        value={emailOrUsername}
        onChangeText={setEmailOrUsername}
      />
      {users.length > 0 ? (
        <FlatList
          data={users}
          renderItem={({item}) => (
            <SearchUserItem
              user={item}
              mode={'select'}
              onSelectUser={onSelectUser}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <FlatList
          data={users}
          renderItem={({item}) => (
            <SearchUserItem
              user={item}
              mode={'view'}
              onRemoveUser={onRemoveUser}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </React.Fragment>
  );
};