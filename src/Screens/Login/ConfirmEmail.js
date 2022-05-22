import React, {useEffect, useRef, useState} from 'react';
import {BackLayout} from '../../Components/Layouts/BackLayout';
import {useAuth} from '../../Providers/AuthProvider';
import {useAlerts} from '../../Providers/AlertsProvider';
import {Trans, useTranslation} from 'react-i18next';
import {CustomText} from '../../Components/Common/CustomText';
import {post} from '../../Utils/Api/Fetch';
import {comp} from '../../Styles/Blocks';
import {CustomButton} from '../../Components/Common/CustomButton';
import {TextField} from '../../Components/Common/Inputs/TextField';
import {connect} from 'react-redux';

const WAIT_SECONDS = 30;

const ConfirmEmail = ({user}) => {
  const {t} = useTranslation();
  const {onLogin} = useAuth();
  const {setAlert} = useAlerts();
  const interval = useRef(null);
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [seconds, setSeconds] = useState(WAIT_SECONDS);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => setEmail(user?.email), [user?.email]);
  useEffect(() => seconds === 0 && clearInterval(interval.current), [seconds]);

  useEffect(() => {
    if (!disabled) {
      return;
    }

    const timeout = setTimeout(() => setDisabled(false), WAIT_SECONDS * 1000);
    interval.current = setInterval(() => setSeconds(state => state - 1), 1000);
    return () => clearInterval(timeout);
  }, [disabled]);

  const onSendEmail = async () => {
    setDisabled(true);
    setSeconds(WAIT_SECONDS);
    const {error} = await post(
      'api/v1/user/send-confirm-email/',
      {email},
      false,
    );
    setAlert(
      error
        ? t('confirmEmail.errorSendingEmail')
        : t('confirmEmail.successSendingEmail'),
    );
  };

  const onSendCode = async () => {
    const {error, json} = await post(
      'api/v1/user/confirm-email/',
      {email, code},
      false,
    );
    !error && (await onLogin(json?.token));
    setAlert(
      error
        ? t('confirmEmail.activationErrorAlert')
        : t('confirmEmail.activationSuccessAlert'),
    );
  };

  return (
    <BackLayout header={false} title={t('confirmEmail.title')}>
      <CustomText style={[comp.normalText, comp.input]}>
        <Trans
          defaults={t('confirmEmail.block_1', {email})}
          components={[<CustomText style={{fontFamily: 'Roboto-Medium'}} />]}
        />
      </CustomText>
      <CustomText style={[comp.normalText, comp.input]}>
        {t('confirmEmail.block_2')}
      </CustomText>
      <CustomButton
        containerStyle={comp.input}
        disabled={disabled}
        onPress={onSendEmail}
        type={'outline'}
        color={'primary'}
        title={
          seconds === 0
            ? t('confirmEmail.sendEmail')
            : t('confirmEmail.sendEmailIn', {count: seconds})
        }
      />
      <TextField
        style={comp.input}
        value={code}
        onChangeText={setCode}
        label={t('confirmEmail.codeInputLabel')}
        placeholder={t('confirmEmail.codeInputPlaceholder')}
      />
      <CustomButton
        containerStyle={comp.input}
        disabled={code.length === 0}
        onPress={onSendCode}
        type={'outline'}
        color={'primary'}
        title={t('confirmEmail.sendCode')}
      />
    </BackLayout>
  );
};

const getState = state => ({user: state.users.user});

export default connect(getState, null)(ConfirmEmail);
