import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {comp} from '../../../styles/Blocks';
import {useGroupTimers} from '../../../providers/groups/GroupTimersProvider';
import {useAlerts} from '../../../providers/AlertsProvider';
import {itemsPerPage} from '../../../utils/Constants';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {BackLayout} from '../../../components/layouts/BackLayout';
import {ListSeparator} from '../../../components/common/ListSeparator';
import {Spinner} from '../../../components/common/Spinner';
import {CustomText} from '../../../components/common/CustomText';
import {SearchTextField} from '../../../components/common/inputs/SearchTextField';
import {History} from '../../../components/items/groups/History';
import {EmptyList} from '../../../components/blocks/EmptyList';
import {TimersPagination} from '../../../components/blocks/timers/TimersPagination';


const GroupHistory = ({group}) => {
  const {t} = useTranslation();
  const {setConfirmModal} = useAlerts();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const {getGroupHistory, history, loadHistory, restoreTimer} = useGroupTimers();

  useEffect(() => {
    (async () => await getGroupHistory(group.id))();
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

  const onRefresh = async () => await getGroupHistory(group.id);

  return (
    <BackLayout title={t('groups.timers.groupHistoryModal.title')}>
      <CustomText>{t('groups.timers.groupHistoryModal.description')}</CustomText>
      <SearchTextField
        search={search}
        setSearch={setSearch}
        placeholder={t('groups.timers.groupHistoryModal.searchPlaceholder')}
      />
      {loadHistory
        ? <Spinner/>
        : <FlatList
          style={[comp.bottomList, comp.input]}
          refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh}/>}
          data={SearchHistory}
          ItemSeparatorComponent={ListSeparator}
          renderItem={({item}) => <History item={item} onRestore={onRestore}/>}
          keyExtractor={item => `${item.id}`}
          removeClippedSubviews={true}
          ListEmptyComponent={() =>
            <EmptyList entities={SearchHistory} search={search} {...t('components.emptyLists.groups.groupHistory')}/>
          }
        />
      }
      <TimersPagination timers={history} setPage={setPage} page={page}/>
    </BackLayout>
  );
};

const getState = (state) => ({group: state.groups.group});

export default connect(
  getState,
  null,
)(GroupHistory);
