import React from 'react';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {Touchable} from './Touchable';
import {comp, UTCStyles} from '../../styles/Blocks';
import {CustomText} from '../common/CustomText';

export const UnderTimerComment = ({item, store, onDropComment}) => {
  const commentShown = useSelector(state => state[store].commentShown);

  return (
    <React.Fragment>
      {(item?.comment && commentShown)
        ? <View style={UTCStyles.container}>
          <CustomText style={UTCStyles.text}>{item?.comment}</CustomText>
          <View style={comp.flex}/>
          <View style={UTCStyles.close}>
            <Touchable name={'close'} type={'antdesign'} action={onDropComment}/>
          </View>
        </View>
        : null
      }
    </React.Fragment>
  );
};
