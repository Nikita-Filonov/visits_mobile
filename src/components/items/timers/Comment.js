import React from 'react';
import {MonsterStyles} from '../../../styles/Items';
import {TouchableOpacity} from 'react-native';
import {CustomText} from '../../common/CustomText';
import {useThemes} from '../../../providers/ThemeProvider';


export const Comment = ({item, onComment}) => {
  const {theme} = useThemes();

  const onSelectComment = () => onComment(item.text);

  return (
    <TouchableOpacity onPress={onSelectComment} style={[{backgroundColor: theme.listItem}, MonsterStyles.container]}>
      <CustomText>{item.text}</CustomText>
    </TouchableOpacity>
  );
};
