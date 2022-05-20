import React from 'react';
import {Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SortSheetItem} from '../../items/timers/SortSheetItem';
import {TIMERS_SORT} from '../../../utils/Constants';
import {CustomBottomSheet} from '../../common/CustomBottomSheet';
import {Divider} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';


export const TimersSortingSheet = React.forwardRef(({sort, setSort, backup}, ref) => {

  const onSelect = async (item) => {
    setSort(item);
    await AsyncStorage.setItem(backup, item);
    ref?.current?.snapTo(2);
  };

  return (
    <CustomBottomSheet ref={ref} snapPoints={[Dimensions.get('window').height / 2.4, 200, 0]}>
      <FlatList
        data={TIMERS_SORT}
        renderItem={({item}) => <SortSheetItem item={item} sort={sort} onSelect={onSelect}/>}
        removeClippedSubviews={true}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <Divider/>}
      />
    </CustomBottomSheet>
  );
});
