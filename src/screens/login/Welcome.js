import React from 'react';
import {Image, View} from 'react-native';
import {comp} from '../../styles/Blocks';
import {baseUrl} from '../../utils/Links';
import {WStyles} from '../../styles/Screens';
import {MainView} from '../../components/layouts/MainView';
import {CustomButton} from '../../components/common/CustomButton';
import {CustomText} from '../../components/common/CustomText';
import {useTranslation} from 'react-i18next';

export const Welcome = ({navigation}) => {
  const {t} = useTranslation();

  const onRegistration = () => navigation.navigate('Registration');
  const onLogin = () => navigation.navigate('Login');

  return (
    <MainView header={false}>
      <View style={comp.viewContainer}>
        <Image
          style={WStyles.image}
          source={{uri: baseUrl + 'static/icons/timer-icon.png', cache: 'force-cache'}}
        />
        <CustomText style={WStyles.title}>{t('welcome.title')}</CustomText>
        <CustomText style={WStyles.text}>{t('welcome.description')}</CustomText>
        <CustomButton
          type={'outline'}
          onPress={onRegistration}
          title={t('login.registration')}
          containerStyle={WStyles.regButton}
          color={'primary'}
        />
        <View style={WStyles.authContainer}>
          <CustomText style={WStyles.authText}>{t('welcome.alreadyHaveAccount')}</CustomText>
          <CustomButton
            color={'primary'}
            upper={false}
            title={t('registration.authorization')}
            onPress={onLogin}
            type={'clear'}
          />
        </View>
      </View>
    </MainView>
  );
};
