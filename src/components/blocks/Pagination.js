import React, {useRef} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {pagination} from '../../Styles/Blocks';
import {Touchable} from './Touchable';
import {useThemes} from '../../Providers/ThemeProvider';

const Page = ({number, page, setPage}) => {
  const {theme} = useThemes();

  return (
    <TouchableOpacity
      onPress={() => setPage(number)}
      style={[
        pagination.page,
        {
          backgroundColor:
            page === number ? theme.listItemSelected : theme.background,
          borderColor: theme.text,
        },
      ]}>
      <Text style={{color: theme.text}}>{number}</Text>
    </TouchableOpacity>
  );
};

export const Pagination = ({count, page, setPage}) => {
  const paginationRef = useRef(null);

  const onLastIndex = () => {
    setPage(count);
    paginationRef.current.scrollToIndex({index: count - 1, animated: true});
  };

  const onFirstIndex = () => {
    setPage(1);
    paginationRef.current.scrollToIndex({index: 0, animated: true});
  };

  return (
    <View style={pagination.container}>
      <Touchable
        name={'chevron-left'}
        type={'feather'}
        disabled={page === 1}
        action={onFirstIndex}
      />
      <View style={pagination.arrowsSeparator} />
      <FlatList
        contentContainerStyle={pagination.listContainer}
        ref={paginationRef}
        scrollEnabled={true}
        style={pagination.list}
        horizontal={true}
        data={new Array(count)}
        ItemSeparatorComponent={() => <View style={pagination.itemSeparator} />}
        renderItem={({_, index}) => (
          <Page page={page} number={index + 1} setPage={setPage} />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
      <View style={pagination.arrowsSeparator} />
      <Touchable
        name={'chevron-right'}
        type={'feather'}
        disabled={page === count}
        action={onLastIndex}
      />
    </View>
  );
};
