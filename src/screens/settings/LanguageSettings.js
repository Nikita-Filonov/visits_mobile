import React, {useEffect, useState} from 'react';
import {useSettings} from '../../providers/SettingsProvider';
import i18n from 'i18next';
import {safeLocale} from '../../utils/Utils';
import {LOCALE_BACKUP, SUPPORTED_LOCALES} from '../../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import {useAuth} from '../../providers/AuthProvider';
import {BackLayout} from '../../components/layouts/BackLayout';
import {useTranslation} from 'react-i18next';
import {LanguageItem} from '../../components/blocks/settings/LanguageItem';
import {View} from 'react-native';
import {comp} from '../../styles/Blocks';

export const LanguageSettings = () => {
  const {token} = useAuth();
  const {t} = useTranslation();
  const {updateSettings} = useSettings();
  const [locale, setLocale] = useState('');

  useEffect(() => {
    (async () => {
      const locale = await safeLocale();
      setLocale(locale);
    })();
  }, []);

  const onChangeLanguage = async (locale) => {
    await i18n.changeLanguage(locale);
    setLocale(locale);
    await AsyncStorage.setItem(LOCALE_BACKUP, locale);
    token && await updateSettings({locale});
  };

  return (
    <BackLayout title={t('components.languageSelect.label')}>
      <View style={comp.input}/>
      <LanguageItem
        locale={locale}
        onChangeLanguage={onChangeLanguage}
        language={SUPPORTED_LOCALES.ru}
        label={'Русский'}
      />
      <View style={comp.input}/>
      <LanguageItem
        locale={locale}
        onChangeLanguage={onChangeLanguage}
        language={SUPPORTED_LOCALES.en}
        label={'English'}
      />
    </BackLayout>
  );
};
