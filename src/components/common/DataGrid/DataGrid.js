import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {DataGridHeader} from './DataGridHeader';
import {DataGridRow} from './DataGridRow';
import {DataGridFooter} from './DataGridFooter';

export const DataGrid = ({columns, rows, style}) => {

  const keyExtractor = useCallback((_, index) => index.toString(), []);
  const header = useCallback(() => <DataGridHeader columns={columns}/>, []);
  const row = useCallback(({item}) => <DataGridRow item={item} columns={columns}/>, []);

  return (
    <FlatList
      style={style}
      data={rows}
      removeClippedSubviews={true}
      ListHeaderComponent={header}
      ListFooterComponent={DataGridFooter}
      renderItem={row}
      keyExtractor={keyExtractor}
    />
  );
};
