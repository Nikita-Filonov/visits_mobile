import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {comp} from '../../Styles/Blocks';
import {LPStyles} from '../../Styles/Screens';
import {post} from '../../Utils/Api/Fetch';
import {CustomText} from '../../Components/Common/CustomText';
import {CustomButton} from '../../Components/Common/CustomButton';
import {TextField} from '../../Components/Common/Inputs/TextField';
import {useTranslation} from 'react-i18next';
import {PasswordTextField} from '../../Components/Common/Inputs/PasswordTextField';
import {BackLayout} from '../../Components/Layouts/BackLayout';
import {connect} from 'react-redux';
import {setUser} from '../../Redux/Users/usersActions';
import {AlertMessage} from '../../Components/Common/AlertMessage';

const Registration = ({navigation, setUser}) => {
  const {t} = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setP1] = useState('');
  const [password2, setP2] = useState('');
  const [request, setRequest] = useState(false);
  const [alert, setAlert] = useState(false);

  const createUser = async () => {
    setRequest(true);
    const payload = {username, email, password2, password: password1};
    const {error, json} = await post('api/v1/user/', payload, false);
    if (error) {
      setAlert(error);
    } else {
      setUser(json);
      navigation.navigate('ConfirmEmail');
    }
    setRequest(false);
  };

  return (
    <BackLayout
      title={t('login.registration')}
      navigation={navigation}
      header={false}>
      <ScrollView>
        <CustomText style={LPStyles.title}>Visits</CustomText>
        {alert && (
          <AlertMessage
            level={'error'}
            message={
              'Произошла ошибка. Попробуйте проверить правильность данных'
            }
            style={LPStyles.alert}
          />
        )}
        <TextField
          value={username}
          onChangeText={setUsername}
          label={t('registration.username')}
          placeholder={'MyGameUsername'}
        />
        <TextField
          style={comp.input}
          value={email}
          onChangeText={setEmail}
          label={t('login.email')}
          placeholder={'my.email@gmail.com'}
        />
        <PasswordTextField
          style={comp.input}
          value={password1}
          onChangeText={setP1}
          label={t('login.password')}
        />
        <PasswordTextField
          style={comp.input}
          value={password2}
          onChangeText={setP2}
          label={t('profile.changePassword.confirmThePassword')}
        />
        <CustomButton
          loading={request}
          onPress={createUser}
          containerStyle={{marginTop: '9%'}}
          title={t('registration.signUp')}
          color={'primary'}
          type={'outline'}
        />
        <View style={LPStyles.alreadyMember}>
          <CustomText>{t('welcome.alreadyHaveAccount')}</CustomText>
          <CustomButton
            upper={false}
            onPress={() => navigation.navigate('Login')}
            type={'clear'}
            title={t('registration.authorization')}
            color={'primary'}
          />
        </View>
      </ScrollView>
    </BackLayout>
  );
};

export default connect(null, {setUser})(Registration);
