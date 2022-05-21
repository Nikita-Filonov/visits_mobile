import React, {useEffect, useState} from 'react';
import {QRCodeScanner} from '../../../Components/common/QRCodeScanner/QRCodeScanner';
import {useAlerts} from '../../../Providers/AlertsProvider';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {VISIT_STATES} from '../../../utils/Constants';
import {parseStudentQRCode} from '../../../utils/Helpers/Validators';
import {useUserPairs} from '../../../Providers/Pairs/UserPairsProvider';

const ScanStudentQRCode = ({navigation, pair}) => {
  const {setAlert} = useAlerts();
  const {isFocused} = useNavigation();
  const {request, createVisit} = useUserPairs();
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
