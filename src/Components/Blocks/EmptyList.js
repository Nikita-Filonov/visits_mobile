import React from 'react';
import {Image, View} from 'react-native';
import {baseUrl} from '../../Utils/Links';
import {ListEmptyStyles} from '../../Styles/Blocks';
import {useTranslation} from 'react-i18next';
import {CustomText} from '../Common/CustomText';

type Props = {
  title: string,
  description?: string,
  entities?: Array<Object>,
  search?: string,
};

export const EmptyList = (props: Props) => {
  const {title, description, entities, search} = props;
  const {t} = useTranslation();

  return (
    <View style={ListEmptyStyles.container}>
      <Image
        source={{
          uri: baseUrl + 'static/empty.png',
          cache: 'force-cache',
        }}
        style={ListEmptyStyles.image}
      />
      <View style={ListEmptyStyles.textWrapper}>
        <CustomText style={ListEmptyStyles.title}>
          {entities?.length === 0 && search?.length > 0
            ? t('components.emptyLists.emptySearch.text')
            : title}
        </CustomText>
        {(description || entities) && (
          <CustomText style={ListEmptyStyles.subtitle}>
            {entities?.length === 0 && search?.length > 0
              ? t('components.emptyLists.emptySearch.description')
              : description}
          </CustomText>
        )}
      </View>
    </View>
  );
};
