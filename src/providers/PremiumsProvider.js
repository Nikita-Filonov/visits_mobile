import React, {useContext, useEffect, useState} from 'react';
import {get, patch, post} from '../utils/Api/Fetch';
import {SUPPORTED_ACTIONS, useAlerts} from './AlertsProvider';
import {useAuth} from './AuthProvider';
import {useTranslation} from 'react-i18next';
import {Linking} from 'react-native';

const PremiumsContext = React.createContext(null);

const PremiumsProvider = ({children}) => {
  const {token} = useAuth();
  const {t} = useTranslation();
  const {setAlert, successTemplate} = useAlerts();
  const [userPremium, setUserPremium]: Array<
    Object<{action: string, limit: number}>,
  > = useState([]);
  const [userPremiums, setUserPremiums] = useState([]);
  const [premiums, setPremiums] = useState([]);
  const [load, setLoad] = useState(true);

  const PREMIUM = t('components.alerts.instances.premium');

  useEffect(() => {
    (async () => token && (await getUserPremium()))();
  }, [token, userPremiums]);

  const updateUserPremium = async json =>
    setUserPremiums(userPremiums.map(p => (p.id === json?.id ? json : p)));

  const getPremiums = async () => {
    setLoad(true);
    const {error, json} = await get('api/v1/premiums/');
    !error && setPremiums(json);
    setLoad(false);
  };

  const getUserPremium = async () => {
    setLoad(true);
    const {error, json} = await get('api/v1/user-premiums/me/');
    !error && setUserPremium(json);
    setLoad(false);
  };

  const getUserPremiums = async () => {
    setLoad(true);
    const {error, json} = await get('api/v1/user-premiums/');
    !error && setUserPremiums(json);
    setLoad(false);
  };

  const createPremiumBill = async payload => {
    const {error, json} = await post('api/v1/premiums/billing/bill/', payload);
    error && setAlert(json);
    if (!error) {
      await Linking.openURL(json?.payUrl);
      //history.push('/user/premiums');
    }
  };

  const extendUserPremium = async (userPremiumId, payload) => {
    const {error, json} = await patch(
      `api/v1/user-premiums/${userPremiumId}/extend/`,
      payload,
    );
    error && setAlert(json);
    if (!error) {
      await Linking.openURL(json?.payUrl);
      await updateUserPremium(json.userPremium);
    }
  };

  const disableUserPremiumTemporarily = async userPremiumId => {
    const {error, json} = await patch(
      `api/v1/user-premiums/${userPremiumId}/disable-temporarily/`,
    );
    setAlert(
      error ? json : successTemplate(PREMIUM, SUPPORTED_ACTIONS.disable_male),
    );
    !error && (await updateUserPremium(json));
  };

  const enableUserPremiumTemporarily = async userPremiumId => {
    const {error, json} = await patch(
      `api/v1/user-premiums/${userPremiumId}/enable-temporarily/`,
    );
    setAlert(
      error ? json : successTemplate(PREMIUM, SUPPORTED_ACTIONS.enable_male),
    );
    !error && (await updateUserPremium(json));
  };

  return (
    <PremiumsContext.Provider
      value={{
        load,
        premiums,
        userPremium,
        userPremiums,
        getPremiums,
        getUserPremium,
        getUserPremiums,
        createPremiumBill,
        extendUserPremium,
        disableUserPremiumTemporarily,
        enableUserPremiumTemporarily,
      }}>
      {children}
    </PremiumsContext.Provider>
  );
};

const usePremiums = () => {
  const event = useContext(PremiumsContext);
  if (event == null) {
    throw new Error('usePremiums() called outside of a PremiumsProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return event;
};

export {PremiumsProvider, usePremiums};
