import React from 'react';
import {TextField} from './TextField';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-paper';
import {Touchable} from '../../blocks/Touchable';

export const SearchTextField = ({search, setSearch, placeholder, style}) => {
  const {t} = useTranslation();

  const onClear = () => setSearch('');

  return (
    <TextField
      value={search}
      onChangeText={setSearch}
      label={t('common.search')}
      placeholder={placeholder}
      right={search.length > 0 && <TextInput.Icon
        name={() => <Touchable action={onClear} name={'close'} type={'material-community'}/>}
      />}
      style={style}
    />
  );
};
