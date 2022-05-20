import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {comp} from '../../Styles/Blocks';
import {LPStyles} from '../../Styles/Screens';
import {useAuth} from '../../Providers/AuthProvider';
import {CustomText} from '../../components/common/CustomText';
import {TextField} from '../../components/common/inputs/TextField';
import {useTranslation} from 'react-i18next';
import {PasswordTextField} from '../../components/common/inputs/PasswordTextField';
import {CustomButton} from '../../components/common/CustomButton';
import {post} from '../../utils/Api/Fetch';
import {AlertMessage} from '../../components/common/AlertMessage';
import {BackLayout} from '../../components/Layouts/BackLayout';

export const Login = ({navigation}) => {
  const {t} = useTranslation();
  const {onLogin} = useAuth();
  const [request, setRequest] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const login = async () => {
    setRequest(true);
    const {json, code} = await post('api/v1/login/', {email, password}, false);
    code === 401 && setAlert(t('login.authError'));

    if (json?.token) {
      await onLogin(json.token);
      navigation.navigate('Timers');
    }
    setRequest(false);
  };

  return (
    <BackLayout
      title={t('registration.authorization')}
      navigation={navigation}
      header={false}>
      <ScrollView>
        <CustomText style={LPStyles.title}>Visits</CustomText>
        {alert?.message && <AlertMessage {...alert} style={LPStyles.alert} />}
        <TextField
          value={email}
          onChangeText={setEmail}
          label={t('login.email')}
          placeholder={'my.email@gmail.com'}
        />
        <PasswordTextField
          style={comp.input}
          value={password}
          onChangeText={setPassword}
          label={t('login.password')}
        />
        <CustomButton
          loading={request}
          onPress={login}
          containerStyle={{marginTop: '10%'}}
          title={t('login.signIn')}
          type={'outline'}
          color={'primary'}
        />
        <View style={LPStyles.alreadyMember}>
          <CustomText>{t('login.doNotHaveAccount')}</CustomText>
          <CustomButton
            upper={false}
            onPress={() => navigation.navigate('Registration')}
            type={'clear'}
            title={t('login.registration')}
            color={'primary'}
          />
        </View>
      </ScrollView>
    </BackLayout>
  );
};
