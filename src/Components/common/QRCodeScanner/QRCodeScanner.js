import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';
import {getCameraPermissions} from '../../../utils/Helpers/Permissions';
import {CustomText} from '../CustomText';

export const QRCodeScanner = ({setValue}) => {
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

  useEffect(() => setValue(barcodes), [barcodes]);

  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      {device != null && hasPermission && (
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
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
          <CustomText style={{fontSize: 18, color: '#FFFFFF'}}>
            Отсканируйте QR-код
          </CustomText>
          <View
            style={{
              marginTop: 5,
              width: 220,
              height: 220,
              borderRadius: 7,
              borderColor: '#FFFFFF',
              borderWidth: 5,
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
