import React, {useEffect, useMemo, useRef, useState} from 'react';
import {comp} from '../../../styles/Blocks';
import {FlatList, RefreshControl, View} from 'react-native';
import {useGroupTimers} from '../../../providers/groups/GroupTimersProvider';
import GroupTimer from '../../../components/items/timers/GroupTimer';
import {connect} from 'react-redux';
import {EmptyList} from '../../../components/blocks/EmptyList';
import AdMobBanner from 'react-native-admob/RNAdMobBanner';
import GroupTimersHeader from '../../../components/blocks/groups/GroupTimersHeader';
import GroupTimersToolbar from '../../../components/blocks/groups/GroupTimersToolbar';
import {GROUP_TIMERS_SORT_BACKUP, itemsPerPage} from '../../../utils/Constants';
import InviteMemberModal from '../../../components/modals/groups/settings/InviteMemberModal';
import {TimerProvider} from '../../../providers/timers/TimerProvider';
import {MainView} from '../../../components/layouts/MainView';
import {SearchTextField} from '../../../components/common/inputs/SearchTextField';
import {useTranslation} from 'react-i18next';
import {TimersSortingSheet} from '../../../components/other/sheets/TimersSortingSheet';
import {setGroupTimersSort} from '../../../redux/GroupTimers/groupTimersActions';
import {GroupTimersFab} from '../../../components/blocks/groups/GroupTimers/GroupTimersFab';
import {Spinner} from '../../../components/common/Spinner';
import {useSelected} from '../../../utils/hooks/SelectHook';
import {TimersPagination} from '../../../components/blocks/timers/TimersPagination';


const GroupTimers = ({group, groupTimersSort, setGroupTimersSort}) => {
  const sortRef = useRef(null);
  const timersRef = useRef(null);
  const {t} = useTranslation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const {events, load, getEvents} = useGroupTimers();
  const {onSelect, selected, setSelected} = useSelected();

  useEffect(() => {
    (async () => {
      await getEvents(group?.id);
      timersRef.current = setInterval(async () => await getEvents(group?.id), 18000);
    })();

    return () => clearInterval(timersRef.current);
  }, [groupTimersSort]);

  const TimersSearch = useMemo(() =>
      events.filter(
        event => event.monster.name.toLowerCase().includes(search.toLowerCase()),
      ).slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [events, search, page],
  );

  const onRefresh = async () => await getEvents(group?.id);

  return (
    <MainView>
      {selected.length > 0
        ? <GroupTimersToolbar setPage={setPage} selectedTimers={selected} setSelectedTimers={setSelected}/>
        : <GroupTimersHeader sortRef={sortRef}/>
      }
      <View style={{...comp.smallViewContainer, ...comp.flex}}>
        <SearchTextField
          search={search}
          setSearch={setSearch}
          placeholder={t('timers.search.placeholder')}
          style={comp.smallViewContainer}
        />
        {load
          ? <Spinner/>
          : <FlatList
            refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh}/>}
            removeClippedSubviews={true}
            data={TimersSearch}
            renderItem={({item}) =>
              <TimerProvider item={item}>
                <GroupTimer item={item} onSelectTimer={onSelect} selectedTimers={selected}/>
              </TimerProvider>
            }
            keyExtractor={item => `${item.id}`}
            ListEmptyComponent={() =>
              <EmptyList entities={TimersSearch} search={search} {...t('components.emptyLists.groups.timers')}/>
            }
            ListFooterComponent={() => <TimersPagination timers={events} page={page} setPage={setPage}/>}
          />
        }
      </View>
      <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-1094213860762666/9161652801"
        testDevices={[AdMobBanner.simulatorId]}
      />
      <GroupTimersFab/>
      <InviteMemberModal/>
      <TimersSortingSheet
        ref={sortRef}
        sort={groupTimersSort}
        setSort={setGroupTimersSort}
        backup={GROUP_TIMERS_SORT_BACKUP}
      />
    </MainView>
  );
};

const getState = (state) => ({
  group: state.groups.group,
  groupTimersSort: state.groupTimers.groupTimersSort,
});


export default connect(
  getState,
  {
    setGroupTimersSort,
  },
)(GroupTimers);
