import React from 'react';
import {FlatList} from 'react-native';
import {useSettings} from '../../../providers/SettingsProvider';
import {Comment} from '../../../components/items/settings/Comment';
import {EmptyList} from '../../../components/blocks/EmptyList';
import {BackLayout} from '../../../components/layouts/BackLayout';
import {useTranslation} from 'react-i18next';
import {CustomFab} from '../../../components/common/CustomFab';
import {ListSeparator} from '../../../components/common/ListSeparator';

export const CommentsSettings = ({navigation}) => {
  const {t} = useTranslation();
  const {settings} = useSettings();

  const onCreate = () => navigation.navigate('CreateComment');

  return (
    <BackLayout title={t('settings.comments.title')}>
      <FlatList
        data={settings.comments}
        renderItem={({item}) => <Comment item={item}/>}
        ItemSeparatorComponent={ListSeparator}
        removeClippedSubviews={true}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={() => <EmptyList {...t('components.emptyLists.settings.comments')}/>}
      />
      <CustomFab onPress={onCreate}/>
    </BackLayout>
  );
};
