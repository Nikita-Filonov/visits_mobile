import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Trans, useTranslation} from 'react-i18next';
import {ConfirmLayout} from '../../../components/layouts/ConfirmLayout';
import {useTimers} from '../../../providers/timers/TimersProvider';
import {useGroupPermissions} from '../../../providers/groups/GroupPermissionsProvider';
import {useGroupTimers} from '../../../providers/groups/GroupTimersProvider';
import {useSelected} from '../../../utils/hooks/SelectHook';
import {EmptyList} from '../../../components/blocks/EmptyList';
import {ImportTimer} from '../../../components/items/groups/ImportTimer';
import {Spinner} from '../../../components/common/Spinner';
import {EVENT} from '../../../utils/permissions/Groups';
import {CustomText} from '../../../components/common/CustomText';
import {comp} from '../../../styles/Blocks';
import {Link} from '../../../components/common/Link';


const ImportTimers = ({navigation, group}) => {
  const {t} = useTranslation();
  const {load, timers} = useTimers();
  const {isAllowed} = useGroupPermissions();
  const {request, importEvents} = useGroupTimers();
  const {selected, onSelect, dropSelected} = useSelected();

  const onImport = async () => importEvents(group.id, selected).then(() => {
    dropSelected();
    navigation.goBack();
  });

  const onPersonalTimers = () => navigation.navigate('Timers');

  return (
    <ConfirmLayout
      loading={request}
      onConfirm={onImport}
      title={t('groups.timers.importTimerModal.title')}
      disabled={selected.length === 0 || !isAllowed([EVENT.create])}
    >
      <CustomText style={comp.normalText}>
        <Trans
          defaults={t('groups.timers.importTimerModal.description')}
          components={[<Link onPress={onPersonalTimers}/>]}
        />
      </CustomText>
      {load
        ? <Spinner/>
        : <FlatList
          style={[comp.input, comp.bottomList]}
          data={timers}
          renderItem={({item}) => <ImportTimer item={item} timerIds={selected} selectTimer={onSelect}/>}
          keyExtractor={item => item.id}
          removeClippedSubviews={true}
          ListEmptyComponent={() => <EmptyList {...t('components.emptyLists.groups.importTimers')}/>}
        />
      }
    </ConfirmLayout>
  );
};

const getState = (state) => ({group: state.groups.group});

export default connect(getState, null)(ImportTimers);
