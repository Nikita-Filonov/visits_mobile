import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {comp} from '../../../styles/Blocks';
import {useGroupTimers} from '../../../providers/groups/GroupTimersProvider';
import {connect} from 'react-redux';
import {itemsPerPage} from '../../../utils/Constants';
import {useAlerts} from '../../../providers/AlertsProvider';
import {useTranslation} from 'react-i18next';
import {CustomText} from '../../../components/common/CustomText';
import {SearchTextField} from '../../../components/common/inputs/SearchTextField';
import {Spinner} from '../../../components/common/Spinner';
import {ListSeparator} from '../../../components/common/ListSeparator';
import {History} from '../../../components/items/groups/History';
import {EmptyList} from '../../../components/blocks/EmptyList';
import {TimersPagination} from '../../../components/blocks/timers/TimersPagination';
import {BackLayout} from '../../../components/layouts/BackLayout';


const TimerHistory = ({group, groupTimer}) => {
  const {setConfirmModal} = useAlerts();
  const {t} = useTranslation();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const {getTimerHistory, history, loadHistory, restoreTimer} = useGroupTimers();

  useEffect(() => {
    (async () => await getTimerHistory(group.id, groupTimer.id))();
  }, []);

  const SearchHistory = useMemo(() =>
      history.filter(
        hist => hist.user.username.toLowerCase().includes(search.toLowerCase()),
      ).slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [history, search, page],
  );

  const onRestore = async (historyId) => setConfirmModal({
    action: async () => await restoreTimer(group.id, historyId),
    modal: true,
    content: t('groups.timers.restoreTimerModal'),
  });

  const onRefresh = async () => await getTimerHistory(group.id, groupTimer.id);

  return (
    <BackLayout title={t('groups.timers.timerHistoryModal.title')}>
      <CustomText>{t('groups.timers.timerHistoryModal.description')}</CustomText>
      <SearchTextField
        search={search}
        setSearch={setSearch}
        placeholder={t('groups.timers.groupHistoryModal.searchPlaceholder')}
      />
      {loadHistory
        ? <Spinner/>
        : <FlatList
          style={[comp.input, comp.bottomList]}
          refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh}/>}
          data={SearchHistory}
          renderItem={({item}) => <History item={item} onRestore={onRestore}/>}
          keyExtractor={item => `${item.id}`}
          removeClippedSubviews={true}
          ItemSeparatorComponent={ListSeparator}
          ListEmptyComponent={() =>
            <EmptyList entities={SearchHistory} search={search} {...t('components.emptyLists.groups.timerHistory')}/>
          }
        />
      }
      <TimersPagination timers={history} setPage={setPage} page={page}/>
    </BackLayout>

  );
};


const getState = (state) => ({
  group: state.groups.group,
  groupTimer: state.groupTimers.groupTimer,
});

export default connect(
  getState,
  null,
)(TimerHistory);
