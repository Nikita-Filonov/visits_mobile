import React, {useEffect, useMemo, useState} from 'react';
import {useAuth} from '../../../Providers/AuthProvider';
import type {User} from '../../../Models/User';
import {UsersSearchTextField} from '../../Common/Inputs/UsersSearchTextField';
import {SearchUserItem} from '../../Items/Users/SearchUserItem';
import {EmptyList} from '../EmptyList';
import {View} from 'react-native';

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

  const onSelectUser = async (user: User) => {
    setUsers([]);
    setEmailOrUsername('');
    setSelectedUsers([...selectedUsers, user]);
  };

  const onRemoveUser = async (user: User) =>
    setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));

  const isSelecting = useMemo(
    () => users.length > 0 || emailOrUsername.length > 0,
    [emailOrUsername.length, users.length],
  );
  const safeUsers = useMemo(
    () => (isSelecting ? users : selectedUsers),
    [isSelecting, selectedUsers, users],
  );

  return (
    <React.Fragment>
      <UsersSearchTextField
        loading={loadUsers}
        value={emailOrUsername}
        onChangeText={setEmailOrUsername}
      />
      <View>
        {safeUsers.length === 0 ? (
          <EmptyList
            title={
              isSelecting ? 'Нет результатов' : 'Нет выбранных пользователей'
            }
            description={
              isSelecting
                ? 'Ксожалению мы не смогли найти студента по вашему запросу'
                : 'Начните вводить ФИО или почту студента'
            }
          />
        ) : (
          safeUsers.map(user => (
            <SearchUserItem
              key={user.id}
              user={user}
              mode={isSelecting ? 'select' : 'view'}
              onSelectUser={onSelectUser}
              onRemoveUser={onRemoveUser}
            />
          ))
        )}
      </View>
    </React.Fragment>
  );
};
