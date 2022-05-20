import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useNotifications} from '../../providers/NotificationProvider';
import {Notification} from '../../components/items/notifications/Notification';
import {EmptyList} from '../../components/blocks/EmptyList';
import {itemsPerPage} from '../../utils/Constants';
import {useTranslation} from 'react-i18next';
import {DrawerLayout} from '../../components/layouts/DrawerLayout';
import {TimersPagination} from '../../components/blocks/timers/TimersPagination';
import {Spinner} from '../../components/common/Spinner';
import {SearchTextField} from '../../components/common/inputs/SearchTextField';
import {comp} from '../../styles/Blocks';
import {ListSeparator} from '../../components/common/ListSeparator';
import {NotificationsHeaderMenu} from '../../components/other/menus/notifications/NotificationsHeaderMenu';
import AdMobBanner from 'react-native-admob/RNAdMobBanner';


export const Notifications = ({navigation}) => {
  const {t} = useTranslation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const {getNotifications, notifications, unread, load} = useNotifications();

  useEffect(() => {
    (async () => await getNotifications())();
  }, [unread]);

  const NotificationsSearchResult = useMemo(() =>
      notifications.filter(
        event => event.title.toLowerCase().includes(search.toLowerCase()) ||
          event.content.toLowerCase().includes(search.toLowerCase()),
      ).slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [notifications, search, page],
  );

  return (
    <DrawerLayout
      navigation={navigation}
      title={t('components.drawer.notifications')}
      menu={<NotificationsHeaderMenu/>}
    >
      <SearchTextField search={search} setSearch={setSearch} placeholder={t('notifications.searchPlaceholder')}/>
      {load
        ? <Spinner/>
        : <FlatList
          style={comp.input}
          refreshControl={<RefreshControl refreshing={false} onRefresh={getNotifications}/>}
          removeClippedSubviews={true}
          data={NotificationsSearchResult}
          ItemSeparatorComponent={ListSeparator}
          renderItem={({item}) => <Notification item={item}/>}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={() =>
            <EmptyList
              search={search}
              entities={NotificationsSearchResult}
              {...t('components.emptyLists.notifications')}
            />
          }
        />
      }
      <TimersPagination timers={notifications} page={page} setPage={setPage}/>
      <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-1094213860762666/9740231447"
        testDevices={[AdMobBanner.simulatorId]}
      />
    </DrawerLayout>
  );
};
