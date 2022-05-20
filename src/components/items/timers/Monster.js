import React, {useMemo} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useThemes} from '../../../providers/ThemeProvider';
import {CustomText} from '../../common/CustomText';
import {MonsterStyles} from '../../../styles/Items';


export const Monster = ({item, monster, onMonster}) => {
  const {theme} = useThemes();
  const isSelect = useMemo(() => item.id === monster.id, [monster.id]);

  const onSelectMonster = async () => await onMonster(item);

  return (
    <TouchableOpacity
      onPress={onSelectMonster}
      style={[{backgroundColor: isSelect ? theme.listItemSelected : theme.listItem}, MonsterStyles.container]}
    >
      <Image source={{uri: item.image, cache: 'force-cache'}} style={MonsterStyles.image}/>
      <CustomText>{item.name}</CustomText>
    </TouchableOpacity>
  );
};
