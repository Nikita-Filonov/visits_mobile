import React, {useEffect, useState} from 'react';
import {QRCodeScanner} from '../../../Components/common/QRCodeScanner/QRCodeScanner';
import {baseUrl} from '../../../utils/Links';
import {useAlerts} from '../../../Providers/AlertsProvider';

export const ScanStudentQRCode = () => {
  const {setAlert} = useAlerts();
  const [qrCodes, setRQCodes] = useState([]);

  const parseStudentQRCode = async (qrCodesFromVision: Array) => {
    if (qrCodesFromVision.length === 0) {
      return;
    }

    const url = qrCodesFromVision[0]?.displayValue;
    if (!url.startsWith(baseUrl)) {
      setAlert({message: 'Данный QR-код не валидный', level: 'error'});
      return;
    }
  };

  useEffect(() => {
    (async () => await parseStudentQRCode(qrCodes))();
  }, [qrCodes]);

  return <QRCodeScanner setValue={setRQCodes} />;
};
