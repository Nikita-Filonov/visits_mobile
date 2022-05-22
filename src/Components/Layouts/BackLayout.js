import React, {useEffect} from 'react';
import {MainView} from './MainView';
import {Appbar} from 'react-native-paper';
import {AppBarBack} from '../Common/AppBarBack';
import {AppBar} from '../Common/AppBar';
import {BackHandler, View} from 'react-native';
import {comp} from '../../Styles/Blocks';
import {useNavigation} from '@react-navigation/native';
import {useThemes} from '../../Providers/ThemeProvider';

export const BackLayout = ({
  children,
  title,
  subtitle,
  navigation,
  header,
  actions,
  backButton,
  wrapper = true,
  bottom = null,
  onBack,
}) => {
  const {theme} = useThemes();
  const {isFocused} = useNavigation();

  const onSafeBack = () => isFocused() && onBack();

  useEffect(() => {
    if (!onBack) {
      return;
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onSafeBack,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <MainView header={header}>
      <AppBar header={header}>
        {backButton || (
          <AppBarBack navigation={navigation} header={header} onBack={onBack} />
        )}
        <Appbar.Content
          title={title}
          color={header ? '#FFFFFF' : theme.text}
          subtitle={subtitle}
        />
        {actions && actions.map((a, index) => <View key={index}>{a}</View>)}
      </AppBar>
      <View style={wrapper ? [comp.viewContainer, comp.flex] : []}>
        {children}
      </View>
      {bottom}
    </MainView>
  );
};
