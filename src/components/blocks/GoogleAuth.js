import React from 'react';
import {Image, TouchableNativeFeedback, View} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {baseUrl} from '../../utils/Links';
import {useAuth} from '../../Providers/AuthProvider';
import {useAlerts} from '../../Providers/AlertsProvider';
import {GAStyles} from '../../Styles/Blocks';
import {useTranslation} from 'react-i18next';
import {CustomText} from '../common/CustomText';
import {post} from '../../utils/Api/Fetch';

export const GoogleAuth = ({navigation, setRequest}) => {
  const {t} = useTranslation();
  const {onLogin} = useAuth();
  const {setAlert} = useAlerts();

  const googleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    if (!userInfo) {
      return;
    }

    setRequest(true);
    const {error, json} = await post('api/v1/login/google/', userInfo, false);
    if (error) {
      setAlert(json);
    } else {
      await onLogin(json.token);
      navigation.navigate('Timers');
    }
    setRequest(false);
  };

  return (
    <View>
      <CustomText style={GAStyles.text}>{t('login.orContinueWith')}</CustomText>
      <View style={GAStyles.container}>
        <TouchableNativeFeedback
          onPress={googleLogin}
          background={TouchableNativeFeedback.Ripple('black', true)}>
          <View style={GAStyles.wrapper}>
            <Image
              source={{uri: baseUrl + 'static/images/google.png'}}
              style={GAStyles.image}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};
