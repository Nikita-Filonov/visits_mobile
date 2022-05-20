import React, {useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {comp} from '../../../styles/Blocks';
import {useSettings} from '../../../providers/SettingsProvider';
import {Monster} from '../../../components/items/settings/monsters/Monster';
import {EmptyList} from '../../../components/blocks/EmptyList';
import {BackLayout} from '../../../components/layouts/BackLayout';
import {SearchTextField} from '../../../components/common/inputs/SearchTextField';
import {useTranslation} from 'react-i18next';
import {ListSeparator} from '../../../components/common/ListSeparator';
import {MonstersSettingsFab} from '../../../components/blocks/settings/monsters/MonstersSettingsFab';

export const MonstersSettings = () => {
  const {t} = useTranslation();
  const {settings} = useSettings();
  const [search, setSearch] = useState('');

  const onMonstersSearch = useMemo(() =>
      settings.monsters.filter(event => event.name.toLowerCase().includes(search.toLowerCase())),
    [settings.monsters, search],
  );

  return (
    <React.Fragment>
      <BackLayout title={t('settings.monsters.title')}>
        <SearchTextField search={search} setSearch={setSearch} placeholder={t('settings.monsters.searchPlaceholder')}/>
        <FlatList
          style={[comp.input, comp.bottomList]}
          data={onMonstersSearch}
          renderItem={({item}) => <Monster item={item}/>}
          removeClippedSubviews={true}
          ItemSeparatorComponent={ListSeparator}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={() =>
            <EmptyList entities={onMonstersSearch} search={search} {...t('components.emptyLists.settings.monsters')}/>
          }
        />
      </BackLayout>
      <MonstersSettingsFab/>
    </React.Fragment>
  );
};
