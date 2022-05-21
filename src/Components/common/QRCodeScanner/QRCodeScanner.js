import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';
import {getCameraPermissions} from '../../../utils/Helpers/Permissions';
import {CustomText} from '../CustomText';
import {QRCodeScannerStyles} from '../../../Styles/Blocks';

export const QRCodeScanner = ({value, setValue}) => {
  const [hasPermission, setHasPermission] = useState(true);
  const devices = useCameraDevices();
  const device = useMemo(() => devices.back, [devices]);

  useEffect(() => {
    (async () => {
      const granted = await getCameraPermissions();
      setHasPermission(granted);
    })();
  }, []);

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    barcodes.length > 0 &&
      value[0]?.displayValue !== barcodes[0]?.displayValue &&
      setValue(barcodes);
  }, [barcodes, value]);

  return (
    <SafeAreaView style={QRCodeScannerStyles.container}>
      {device != null && hasPermission && (
        <View style={QRCodeScannerStyles.wrapper}>
          <Camera
            fps={30}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
            photo={true}
            orientation="portrait"
          />
          <CustomText style={QRCodeScannerStyles.title}>
            Отсканируйте QR-код
          </CustomText>
          <View style={QRCodeScannerStyles.target} />
        </View>
      )}
    </SafeAreaView>
  );
};
