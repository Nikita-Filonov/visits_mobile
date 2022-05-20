import React from 'react';
import {timer} from '../../../styles/Items';
import {Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {useThemes} from '../../../providers/ThemeProvider';

const SIZES = {
  normal: {style: timer.image, icon: 40},
  small: {style: timer.imageSmall, icon: 30},
};

export const MonsterAvatar = ({image, size = 'normal'}) => {
  const {theme} = useThemes();

  return image
    ? <Image source={{uri: image, cache: 'force-cache'}} style={SIZES[size].style}/>
    : <Icon name={'block'} type={'material'} color={theme.text} size={SIZES[size].icon}/>;
};
