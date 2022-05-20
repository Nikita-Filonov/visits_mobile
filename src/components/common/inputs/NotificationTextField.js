import React from 'react';
import {TextField} from './TextField';
import {useTranslation} from 'react-i18next';
import {comp} from '../../../styles/Blocks';
import {normalizeNotify} from '../../../utils/Utils';

export const NotificationTextField = ({count, client, onChangeText, helpText}) => {
  const {t} = useTranslation();

  return (
    <TextField
      style={comp.input}
      value={count.toString()}
      onChangeText={text => onChangeText(normalizeNotify(text))}
      keyboardType={'numeric'}
      maxLength={2}
      label={t('groups.settings.notificationsIntegrations.notifyInputLabel', {count, client})}
      helpTextType={'info'}
      error={helpText}
    />
  );
};
