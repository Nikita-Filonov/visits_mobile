import React, {useMemo} from 'react';
import {Button, Card, Divider, Icon, ListItem} from 'react-native-elements';
import {View} from 'react-native';
import {convertTime} from '../../../utils/Utils';
import {CustomText} from '../../common/CustomText';
import {comp} from '../../../styles/Blocks';
import {useTimer} from '../../../providers/timers/TimerProvider';
import {useThemes} from '../../../providers/ThemeProvider';
import {useTranslation} from 'react-i18next';
import {MonsterAvatar} from '../../blocks/timers/MonsterAvatar';
import {timer} from '../../../styles/Items';

export const CommonTimer = ({item, selectedTimers, onSelectTimer, onDrop, onKilled, menu, comment}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();
  const {countDown, killedCount, spanCount, background} = useTimer();
  const isSelected = useMemo(() => selectedTimers.indexOf(item.id) !== -1, [selectedTimers]);
  const backgroundColor = useMemo(() => isSelected ? theme.listItemSelected : background, [isSelected, background]);

  const onSafeSelect = () => onSelectTimer(item.id, isSelected);

  return (
    <Card containerStyle={{...timer.container, backgroundColor}}>
      <ListItem
        onLongPress={onSafeSelect}
        onPress={() => selectedTimers.length > 0 && onSafeSelect()}
        containerStyle={{backgroundColor}}
      >
        <MonsterAvatar image={item.monster.image}/>
        <ListItem.Content>
          <ListItem.Title style={{color: theme.text}}>
            {item.monster.name}
          </ListItem.Title>
          <ListItem.Subtitle style={{color: theme.text}}>
            {t('settings.monsters.interval', {interval: convertTime(item.monster.delta)})}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={{color: theme.text}}>
            {t('timers.tableHeader.skipped')} {item.missed}
          </ListItem.Subtitle>
        </ListItem.Content>
        {menu}
      </ListItem>
      <Divider/>
      <View style={timer.infoContainer}>

        <View style={timer.timeWrapper}>
          <Icon name={'calendar'} type={'feather'} size={18} color={theme.text}/>
          <CustomText style={[comp.normalText, timer.timeIcon]}>{t('timers.tableHeader.killed')}</CustomText>
          <View style={comp.flex}/>
          <CustomText style={comp.normalText}>{killedCount}</CustomText>
        </View>
        <Divider style={{marginTop: 5, marginBottom: 5}}/>
        <View style={timer.timeWrapper}>
          <Icon name={'timer-outline'} type={'material-community'} size={18} color={theme.text}/>
          <CustomText style={[comp.normalText, timer.timeIcon]}>{t('timers.tableHeader.spawnThrough')}</CustomText>
          <View style={comp.flex}/>
          <CustomText style={comp.normalText}>{countDown}</CustomText>
        </View>
        <Divider style={{marginTop: 5, marginBottom: 5}}/>
        <View style={timer.timeWrapper}>
          <Icon name={'calendar'} type={'feather'} size={18} color={theme.text}/>
          <CustomText style={[comp.normalText, timer.timeIcon]}>{t('timers.tableHeader.spawnIn')}</CustomText>
          <View style={comp.flex}/>
          <CustomText style={comp.normalText}>{spanCount}</CustomText>
        </View>
      </View>
      <View style={timer.buttonsContainer}>
        <Button
          title={t('timers.killed')}
          onPress={onKilled}
          type={'outline'}
          titleStyle={timer.killedTitle}
          buttonStyle={timer.killedButton}
          containerStyle={comp.flex}
        />
        <View style={timer.separator}/>
        <Button
          onPress={onDrop}
          type={'outline'}
          title={t('timers.reset')}
          titleStyle={timer.resetTitle}
          buttonStyle={timer.resetButton}
          containerStyle={comp.flex}
        />
      </View>
      {comment}
    </Card>
  );
};
