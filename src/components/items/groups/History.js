import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import {useTranslation} from 'react-i18next';
import {fromNow} from '../../../utils/Utils';
import {EVENT, EVENT_HISTORY} from '../../../utils/permissions/Groups';
import {useThemes} from '../../../providers/ThemeProvider';
import {useGroupPermissions} from '../../../providers/groups/GroupPermissionsProvider';
import {View} from 'react-native';
import {MonsterAvatar} from '../../blocks/timers/MonsterAvatar';
import {CustomText} from '../../common/CustomText';
import {MonsterHistoryInfo} from '../../blocks/groups/GroupTimers/MonsterHistoryInfo';
import {Icon} from 'react-native-elements';
import {HorizontalDivider} from '../../common/HorizontalDivider';
import {OnlineBadge} from '../../common/badges/OnlineBadge';
import {CustomButton} from '../../common/CustomButton';
import {comp} from '../../../styles/Blocks';
import {history} from '../../../styles/Items';

const ACTION_ICONS = {
  delete: {name: 'delete', type: 'material-community', color: 'error'},
  change: {name: 'edit', type: 'material', color: 'info'},
  create: {name: 'alarm-add', type: 'material', color: 'success'},
  import: {name: 'import-export', type: 'material', color: 'warning'},
};


export const History = ({item, onRestore}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();
  const {isAllowed} = useGroupPermissions();
  const template = item?.template;
  const icon = ACTION_ICONS[template?.action];

  moment.locale(t('code'));

  const onSafeRestore = async () => await onRestore(item.id);

  return (
    <View style={[{backgroundColor: theme.listItem}, history.container]}>
      <View style={history.monsterContainer}>
        <MonsterAvatar image={template?.origin?.monster?.image} size={'small'}/>
        <View style={[comp.flex, history.monsterInfoWrapper]}>
          <CustomText>{template?.origin?.monster?.name}</CustomText>
          <MonsterHistoryInfo template={template}/>
        </View>
        <Icon {...icon} color={theme.colors[icon.color]} size={17}/>
      </View>
      <HorizontalDivider style={history.divider}/>
      <View style={history.userContainer}>
        <OnlineBadge online={item?.user?.online} style={history.badge} size={18}/>
        <CustomText style={history.userText}>
          {item?.user?.username}, {t(`groups.timers.history.userActions.${template?.action}`)} {template?.origin?.monster?.name}
        </CustomText>
      </View>
      <View style={history.actionsContainer}>
        <CustomButton
          theme={'primary'}
          icon={<Icon name={'rotate-left'} type={'material-community'} color={theme.button.primary}/>}
          type={'clear'}
          color={'primary'}
          title={t('groups.timers.history.undo')}
          onPress={onSafeRestore}
          disabled={!isAllowed([EVENT_HISTORY.update, EVENT.update, EVENT.create])}
        />
        <View style={comp.flex}/>
        <CustomText>{fromNow(item?.datetime)}</CustomText>
      </View>
    </View>
  );
};
