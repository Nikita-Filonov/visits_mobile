import React, {useEffect, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {Help} from '../../components/items/help/Help';
import {EmptyList} from '../../components/blocks/EmptyList';
import {get} from '../../utils/api/Fetch';
import {useTranslation} from 'react-i18next';
import {DrawerLayout} from '../../components/layouts/DrawerLayout';
import {SearchTextField} from '../../components/common/inputs/SearchTextField';
import {Spinner} from '../../components/common/Spinner';
import {comp} from '../../styles/Blocks';
import {ListSeparator} from '../../components/common/ListSeparator';
import {HelpHeaderMenu} from '../../components/other/menus/help/HelpHeaderMenu';


export const HelpScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [search, setSearch] = useState('');
  const [helps, setHelps] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    (async () => await getHelps())();
  }, []);

  const getHelps = async () => {
    const {error, json} = await get('api/v1/helps/');
    !error && setHelps(json);
    setLoad(false);
  };

  const HelpsSearch = useMemo(() =>
      helps.filter(help => help[`${t('code')}_title`].toLowerCase().includes(search.toLowerCase())),
    [helps, search],
  );

  return (
    <DrawerLayout title={t('components.drawer.help')} navigation={navigation} menu={<HelpHeaderMenu/>}>
      <SearchTextField search={search} setSearch={setSearch} placeholder={t('help.searchPlaceholder')}/>
      {load
        ? <Spinner/>
        : <FlatList
          style={[comp.input, comp.bottomList]}
          removeClippedSubviews={true}
          data={HelpsSearch}
          ItemSeparatorComponent={ListSeparator}
          renderItem={({item}) => <Help item={item}/>}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={() => <EmptyList search={search} entities={HelpsSearch}/>}
        />
      }
    </DrawerLayout>
  );
};
