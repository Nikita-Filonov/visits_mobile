import {Dimensions, StyleSheet} from 'react-native';
import {BottomSheetItem} from '../Components/Common/BottomSheets/BottomSheetItem';

export const DefaultBottomSheetStyles = StyleSheet.create({
  container: {
    padding: 16,
    height: Dimensions.get('window').height / 2.4,
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginHorizontal: 0,
  },
  tip: {
    backgroundColor: '#C4C4C4',
    width: 52,
    height: 9,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export const BottomSheetItemStyles = StyleSheet.create({
  container: {
    elevation: 0,
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    marginLeft: 30,
  },
});
