import React from 'react';
import {Badge, Icon} from 'react-native-elements';
import {member} from '../../../styles/Items';
import {View} from 'react-native';
import {useThemes} from '../../../providers/ThemeProvider';

export const OnlineBadge = ({online, style, size}) => {
  const {theme} = useThemes();

  return (
    <View style={{marginLeft: 10, ...style}}>
      <Icon name={'user'} type={'feather'} color={theme.text} size={size}/>
      <Badge
        badgeStyle={{backgroundColor: online ? '#44b700' : '#BDBDBD'}}
        containerStyle={member.badge}
      />
    </View>
  );
};
