import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {CustomText} from '../../Common/CustomText';
import {useThemes} from '../../../Providers/ThemeProvider';
import {PairItemStyle} from '../../../Styles/Items';
import {comp} from '../../../Styles/Blocks';
import type {User} from '../../../Models/User';
import {Touchable} from '../../Blocks/Touchable';

type Props = {
  user: User,
  onSelectUser?: (user: User) => void,
  onRemoveUser?: (user: User) => void,
  mode: 'select' | 'view',
};

export const SearchUserItem = (props: Props) => {
  const {user, onSelectUser, onRemoveUser, mode} = props;
  const {theme} = useThemes();

  const onSelect = async () => mode === 'select' && (await onSelectUser(user));

  const onRemove = async () => await onRemoveUser(user);

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        {backgroundColor: theme.listItem},
        PairItemStyle.container,
        PairItemStyle.wrapper,
      ]}>
      <View style={PairItemStyle.timeWrapper}>
        <CustomText style={PairItemStyle.title}>{user.username}</CustomText>
        <CustomText>{user.email}</CustomText>
      </View>
      <View style={comp.flex} />
      {mode === 'view' && (
        <Touchable
          name={'close'}
          type={'material-community'}
          action={onRemove}
        />
      )}
    </TouchableOpacity>
  );
};
