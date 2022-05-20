import React from 'react';
import 'moment/locale/ru';
import {MonsterAvatar} from '../../blocks/timers/MonsterAvatar';
import {fromNow} from '../../../utils/Utils';
import {useThemes} from '../../../providers/ThemeProvider';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {View} from 'react-native';
import {CustomText} from '../../common/CustomText';
import {comp} from '../../../styles/Blocks';
import NotificationMenu from '../../other/menus/notifications/NotificationMenu';


export const Notification = ({item}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();

  moment.locale(t('code'));


  return (
    <View style={[{backgroundColor: theme.listItem, paddingRight: 5, paddingLeft: 10, paddingVertical: 7}, comp.image]}>
      <View style={comp.rowContainer}>
        <CustomText style={comp.normalText}>{item.title}</CustomText>
        <View style={comp.flex}/>
        <MonsterAvatar image={item?.timer?.monster?.image} size={'small'}/>
      </View>
      <CustomText>{item.content}</CustomText>
      <View style={comp.rowContainer}>
        <CustomText>{fromNow(item?.datetime)}</CustomText>
        <View style={comp.flex}/>
        <NotificationMenu notification={item}/>
      </View>
    </View>
  );
};
