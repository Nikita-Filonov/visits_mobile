import React, {useState} from 'react';
import {Linking, ScrollView, View} from 'react-native';
import {comp} from '../../styles/Blocks';
import {baseUrl} from '../../utils/Links';
import {LPStyles} from '../../styles/Screens';
import {useAuth} from '../../providers/AuthProvider';
import {GoogleAuth} from '../../components/blocks/GoogleAuth';
import {CustomText} from '../../components/common/CustomText';
import {TextField} from '../../components/common/inputs/TextField';
import {useTranslation} from 'react-i18next';
import {PasswordTextField} from '../../components/common/inputs/PasswordTextField';
import {CustomButton} from '../../components/common/CustomButton';
import {post} from '../../utils/api/Fetch';
import {AlertMessage} from '../../components/common/AlertMessage';
import {BackLayout} from '../../components/layouts/BackLayout';

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
    <BackLayout title={t('registration.authorization')} navigation={navigation} header={false}>
      <ScrollView>
        <CustomText style={LPStyles.title}>RQ Timer</CustomText>
        {alert?.message && <AlertMessage {...alert} style={LPStyles.alert}/>}
        <TextField value={email} onChangeText={setEmail} label={t('login.email')} placeholder={'my.email@gmail.com'}/>
        <PasswordTextField style={comp.input} value={password} onChangeText={setPassword} label={t('login.password')}/>
        <CustomButton
          containerStyle={comp.input}
          upper={false}
          type={'clear'}
          onPress={async () => await Linking.openURL(baseUrl + 'reset_password/')}
          buttonStyle={{alignSelf: 'flex-end'}}
          title={t('login.forgotPassword')}
          color={'primary'}
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
        <GoogleAuth navigation={navigation} setRequest={setRequest}/>
      </ScrollView>
    </BackLayout>
  );
};
