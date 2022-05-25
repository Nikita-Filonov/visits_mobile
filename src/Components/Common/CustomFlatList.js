import React from 'react';
import {FlatList} from 'react-native';

type Props = {
  style?: Array | Object,
  data: Array,
  refreshControl?: React.ReactNode,
  ItemSeparatorComponent?: React.ReactNode,
  ListEmptyComponent?: React.ReactNode,
  renderItem: () => void,
  keyExtractor: () => void,
};

export const CustomFlatList = (props: Props) => {
  const {
    style,
    data,
    refreshControl,
    ItemSeparatorComponent,
    ListEmptyComponent,
    renderItem,
    keyExtractor,
  } = props;

  return data.length === 0 ? (
    ListEmptyComponent
  ) : (
    <FlatList
      keyboardDismissMode={'handled'}
      style={style}
      data={data}
      refreshControl={refreshControl}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};
