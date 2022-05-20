import React, {useEffect} from 'react';
import {DrawerLayout} from '../../components/layouts/DrawerLayout';
import {useTranslation} from 'react-i18next';
import {usePremiums} from '../../providers/PremiumsProvider';
import {FlatList} from 'react-native';
import {Premium} from '../../components/items/premiums/Premium';
import {Spinner} from '../../components/common/Spinner';
import {ListSeparator} from '../../components/common/ListSeparator';
import {comp} from '../../styles/Blocks';
import {PremiumsHeaderMenu} from '../../components/other/menus/premiums/PremiumsHeaderMenu';

export const Premiums = ({navigation}) => {
  const {t} = useTranslation();
  const {load, premiums, getPremiums} = usePremiums();

  useEffect(() => {
    (async () => await getPremiums())();
  }, []);

  return (
    <DrawerLayout navigation={navigation} title={t('components.drawer.premiums')} menu={<PremiumsHeaderMenu/>}>
      {load
        ? <Spinner/>
        : <FlatList
          style={comp.bottomList}
          data={premiums}
          removeClippedSubviews={true}
          renderItem={({item}) => <Premium item={item}/>}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={ListSeparator}
        />
      }
    </DrawerLayout>
  );
};
