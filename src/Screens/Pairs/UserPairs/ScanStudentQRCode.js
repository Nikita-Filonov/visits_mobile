import React, {useEffect, useState} from 'react';
import {QRCodeScanner} from '../../../Components/common/QRCodeScanner/QRCodeScanner';

export const ScanStudentQRCode = () => {
  const [qrCodes, setRQCodes] = useState([]);

  const parseStudentQRCode = async (qrCodes: Array) => {
    if (qrCodes.length === 0) {
      return;
    }

    const url = qrCodes[0]?.displayValue;
    console.log(url);
  };

  useEffect(() => {
    (async () => await parseStudentQRCode(qrCodes))();
  }, [qrCodes]);

  return <QRCodeScanner setValue={setRQCodes} />;
};
