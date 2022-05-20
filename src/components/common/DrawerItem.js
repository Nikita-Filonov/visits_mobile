import React, {useMemo} from 'react';
import {Icon} from 'react-native-elements';
import {Text, TouchableOpacity, View} from 'react-native';
import {useThemes} from '../../Providers/ThemeProvider';
import {DrawerItemStyles} from '../../Styles/Blocks';

export const DrawerItem = ({
  title,
  iconName,
  iconType,
  onPress,
  badge = null,
  color = null,
  selected = false,
}) => {
  const {theme} = useThemes();

  const selectedColor = useMemo(
    () => (selected ? (theme.dark ? theme.listItem : '#C1FFD3') : null),
    [selected, theme.dark, theme.listItem],
  );

  return (
    <TouchableOpacity
      style={[{backgroundColor: selectedColor}, DrawerItemStyles.container]}
      onPress={onPress}>
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
