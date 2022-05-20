import React from 'react';
import {BackLayout} from '../../components/layouts/BackLayout';
import {useTranslation} from 'react-i18next';
import {ListItem} from 'react-native-elements';
import {useThemes} from '../../providers/ThemeProvider';
import {comp} from '../../styles/Blocks';
import {RadioButton} from 'react-native-paper';
import {View} from 'react-native';
import {ThemeSettingsStyles} from '../../styles/Screens';
import {CheckboxFormControl} from '../../components/common/inputs/CheckboxFormControl';
import {connect} from 'react-redux';
import {setTheme} from '../../redux/Settings/settingsActions';

const ThemeSettings = ({themeSettings, setTheme}) => {
  const {t} = useTranslation();
  const {theme, ThemeStyles, changeTheme} = useThemes();

  const onDark = async () => await changeTheme('dark');
  const onDefault = async () => await changeTheme('default');
  const onShownAlerts = () => setTheme({
    ...themeSettings,
    snackbar: {...themeSettings.snackbar, show: !themeSettings.snackbar.show},
  });

  return (
    <BackLayout title={t('settings.sidebar.theme')}>
      <ListItem
        style={comp.image}
        onPress={onDefault}
        containerStyle={[comp.image, {backgroundColor: ThemeStyles.default.listItemSelected}]}
      >
        <View style={[ThemeSettingsStyles.view, {backgroundColor: ThemeStyles.default.listItem}]}/>
        <ListItem.Content>
          <ListItem.Title style={{color: ThemeStyles.default.text}}>
            {t('settings.theme.lightMode')}
          </ListItem.Title>
        </ListItem.Content>
        <RadioButton
          status={!theme.dark ? 'checked' : 'unchecked'}
          color={theme.button.primary}
          uncheckedColor={ThemeStyles.default.text}
        />
      </ListItem>
      <View style={ThemeSettingsStyles.separator}/>
      <ListItem
        style={comp.image}
        onPress={onDark}
        containerStyle={[comp.image, {backgroundColor: ThemeStyles.dark.listItemSelected}]}
      >
        <View style={[ThemeSettingsStyles.view, {backgroundColor: ThemeStyles.dark.listItem}]}/>
        <ListItem.Content>
          <ListItem.Title style={{color: ThemeStyles.dark.text}}>
            {t('settings.theme.darkMode')}
          </ListItem.Title>
        </ListItem.Content>
        <RadioButton
          status={theme.dark ? 'checked' : 'unchecked'}
          color={theme.button.primary}
          uncheckedColor={ThemeStyles.dark.text}
        />
      </ListItem>

      <CheckboxFormControl
        style={{marginTop: 30}}
        label={t('settings.theme.showAlerts')}
        checked={themeSettings.snackbar.show}
        onPress={onShownAlerts}
      />
    </BackLayout>
  );
};

const getState = (state) => ({themeSettings: state.settings.theme});

export default connect(getState, {setTheme})(ThemeSettings);
