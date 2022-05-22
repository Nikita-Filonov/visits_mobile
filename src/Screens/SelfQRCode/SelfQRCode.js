import React, {useMemo} from 'react';
import {DrawerLayout} from '../../Components/Layouts/DrawerLayout';
import QRCode from 'react-native-qrcode-svg';
import {useAuth} from '../../Providers/AuthProvider';
import {View} from 'react-native';
import {CustomText} from '../../Components/Common/CustomText';
import {baseUrl} from '../../Utils/Links';
import {MyQRCodeStyles} from '../../Styles/Screens';

export const SelfQRCode = ({navigation}) => {
  const {user} = useAuth();
  const payload = useMemo(() => JSON.stringify({userId: user.id}), [user.id]);

  return (
    <DrawerLayout title={'Мой QR-код'} navigation={navigation}>
      <View style={MyQRCodeStyles.container}>
        <CustomText style={MyQRCodeStyles.title}>
          QR-код, {user.username}
        </CustomText>
        <QRCode
          value={payload}
          size={200}
          logo={`${baseUrl}static/logo.png`}
          logoMargin={10}
          logoSize={40}
        />
      </View>
    </DrawerLayout>
  );
};
