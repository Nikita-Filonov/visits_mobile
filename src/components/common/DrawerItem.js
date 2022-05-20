import React from 'react';
import {Icon} from 'react-native-elements';
import {Text, TouchableOpacity, View} from 'react-native';
import {useThemes} from '../../providers/ThemeProvider';
import {DrawerItemStyles} from '../../Styles/Blocks';

export const DrawerItem = ({
  title,
  iconName,
  iconType,
  onPress,
  badge = null,
  color = null,
}) => {
  const {theme} = useThemes();

  return (
    <TouchableOpacity style={[DrawerItemStyles.container]} onPress={onPress}>
      <Icon
        style={DrawerItemStyles.icon}
        name={iconName}
        type={iconType}
        color={color || theme.text}
      />
      <Text style={[{color: theme.text}, DrawerItemStyles.text]}>{title}</Text>
      {badge && <View style={DrawerItemStyles.badgeContainer}>{badge}</View>}
    </TouchableOpacity>
  );
};
