import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {SIStyles} from '../../../styles/Modals';

export const GroupImage = ({item, selectedImage, setSelectedImage}) =>
  <TouchableOpacity onPress={() => setSelectedImage(item)}>
    <Image style={item === selectedImage ? SIStyles.selectedImage : SIStyles.image} source={{uri: item}}/>
  </TouchableOpacity>;
