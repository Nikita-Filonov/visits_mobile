import {StyleSheet} from 'react-native';

export const PairItemStyle = StyleSheet.create({
  container: {
    paddingVertical: 15,
    borderRadius: 3,
    paddingHorizontal: 10,
    elevation: 1.5,
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'row',
  },
  timeWrapper: {
    marginRight: 8,
  },
  nameWrapper: {
    marginLeft: 8,
  },
  divider: {
    height: '100%',
    width: 4,
    borderRadius: 2,
  },
  title: {
    fontSize: 17,
  },
});

export const UserPairItemStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
