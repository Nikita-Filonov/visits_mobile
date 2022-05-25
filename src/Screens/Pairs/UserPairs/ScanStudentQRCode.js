import React, {useEffect, useState} from 'react';
import {QRCodeScanner} from '../../../Components/Common/QRCodeScanner/QRCodeScanner';
import {useAlerts} from '../../../Providers/AlertsProvider';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {VISIT_STATES} from '../../../Utils/Constants';
import {parseStudentQRCode} from '../../../Utils/Helpers/Validators';
import {useUserPairs} from '../../../Providers/Pairs/UserPairsProvider';

const ScanStudentQRCode = ({navigation, pair}) => {
  const {setAlert} = useAlerts();
  const {isFocused} = useNavigation();
  const {createVisit} = useUserPairs();
  const [qrCodes, setRQCodes] = useState([]);

  const createStudentVisit = async (qrCodesFromVision: Array) => {
    const payload = await parseStudentQRCode(qrCodesFromVision);
    if (!payload) {
      setAlert({message: 'Данный QR-код не валидный', level: 'error'});
      return;
    }

    createVisit({
      userId: payload.userId,
      pairId: pair.id,
      state: VISIT_STATES.wasOnPair,
      when: new Date(),
    }).then(() => isFocused && navigation.goBack());
  };

  useEffect(() => {
    (async () => qrCodes.length > 0 && (await createStudentVisit(qrCodes)))();
  }, [qrCodes]);

  return <QRCodeScanner value={qrCodes} setValue={setRQCodes} />;
};

const getState = state => ({pair: state.pairs.pair});
export default connect(getState, null)(ScanStudentQRCode);
