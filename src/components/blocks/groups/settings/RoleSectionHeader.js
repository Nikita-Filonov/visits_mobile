import React from 'react';
import {Icon} from 'react-native-elements';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {CustomText} from '../../../common/CustomText';
import {GroupSectionHeaderStyles} from '../../../../styles/Blocks';
import {useThemes} from '../../../../providers/ThemeProvider';


export const RoleSectionHeader = ({section}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();

  return (
    <View style={GroupSectionHeaderStyles.container}>
      <Icon {...section.icon} color={theme.text}/>
      <CustomText style={GroupSectionHeaderStyles.title}>
        {t(`groups.settings.roles.createRoleModal.instances.${section.label}`)}
      </CustomText>
    </View>
  );
};
