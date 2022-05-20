import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {useTimers} from '../../providers/timers/TimersProvider';
import {comp} from '../../styles/Blocks';
import Timer from '../../components/items/timers/Timer';
import {TimersSortingSheet} from '../../components/other/sheets/TimersSortingSheet';
import {EmptyList} from '../../components/blocks/EmptyList';
import AdMobBanner from 'react-native-admob/RNAdMobBanner';
import {TimersToolbar} from '../../components/blocks/timers/TimersToolbar';
import {itemsPerPage, TIMERS_SORT_BACKUP} from '../../utils/Constants';
import {MainView} from '../../components/layouts/MainView';
import {useTranslation} from 'react-i18next';
import {SearchTextField} from '../../components/common/inputs/SearchTextField';
import {TimerProvider} from '../../providers/timers/TimerProvider';
import {CustomFab} from '../../components/common/CustomFab';
import {connect} from 'react-redux';
import {Spinner} from '../../components/common/Spinner';
import {setTimersSort} from '../../redux/Timers/timersActions';
import {useSelected} from '../../utils/hooks/SelectHook';
import {TimersPagination} from '../../components/blocks/timers/TimersPagination';
import {TimersHeader} from '../../components/blocks/timers/TimersHeader';

const Timers = ({navigation, timersSort, setTimersSort}) => {
  const {t} = useTranslation();
  const sortRef = useRef(null);
  const timersRef = useRef(null);
  const [page, setPage] = useState(1);
  const {load, timers, getTimers} = useTimers();
  const [search, setSearch] = useState('');
  const {setSelected, selected, onSelect} = useSelected();

  useEffect(() => {
    timersRef.current = setInterval(async () => await getTimers(), 18000);
    return () => clearInterval(timersRef.current);
  }, [timersSort]);

  const TimersSearch = useMemo(() =>
      timers.filter(
        event => event.monster.name.toLowerCase().includes(search.toLowerCase()),
      ).slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [timers, search, page],
  );

  const onCreate = () => navigation.navigate('CreateTimer');

  return (
    <MainView>
      {selected.length > 0
        ? <TimersToolbar setPage={setPage} selectedTimers={selected} setSelectedTimers={setSelected}/>
        : <TimersHeader sortRef={sortRef} navigation={navigation}/>
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
            refreshControl={<RefreshControl refreshing={false} onRefresh={getTimers}/>}
            removeClippedSubviews={true}
            data={TimersSearch}
            renderItem={({item}) =>
              <TimerProvider item={item}>
                <Timer item={item} onSelectTimer={onSelect} selectedTimers={selected}/>
              </TimerProvider>
            }
            keyExtractor={item => `${item.id}`}
            ListEmptyComponent={() =>
              <EmptyList entities={TimersSearch} search={search} {...t('components.emptyLists.timers')}/>
            }
            ListFooterComponent={() => <TimersPagination timers={timers} page={page} setPage={setPage}/>}
          />
        }
      </View>
      <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-1094213860762666/1206500535"
        testDevices={[AdMobBanner.simulatorId]}
      />
      <CustomFab onPress={onCreate} withoutWrapper={true}/>
      <TimersSortingSheet ref={sortRef} sort={timersSort} setSort={setTimersSort} backup={TIMERS_SORT_BACKUP}/>
    </MainView>
  );
};

const getState = (state) => ({timersSort: state.timers.timersSort});

export default connect(getState, {setTimersSort})(Timers);
