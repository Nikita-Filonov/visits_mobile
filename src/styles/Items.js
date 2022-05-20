import {StyleSheet} from 'react-native';

export const timer = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginHorizontal: 10,
    borderColor: '#AFAFB3',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 0,
    padding: 0,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  imageSmall: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  title: {
    fontFamily: 'IBMPlexSans-Medium',
  },
  interval: {
    fontFamily: 'IBMPlexSans-Regular',
  },
  killedButton: {
    borderColor: '#4169E1',
    borderWidth: 1,
    borderRadius: 6,
  },
  killedTitle: {
    color: '#4169E1',
    fontFamily: 'IBMPlexSans-Medium',
  },
  resetButton: {
    borderColor: '#F50057',
    borderWidth: 1,
    borderRadius: 6,
  },
  resetTitle: {
    color: '#F50057',
    fontFamily: 'IBMPlexSans-Medium',
  },
  separator: {
    width: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  infoContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  mainText: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 17,
    textAlignVertical: 'center',
  },
  secondaryText: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 17,
    color: '#757575',
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    marginLeft: 10,
  },
});


export const history = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
  monsterContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  monsterInfoWrapper: {
    marginLeft: 15,
  },
  divider: {
    marginHorizontal: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  badge: {
    marginLeft: 0,
  },
  userText: {
    marginLeft: 15,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 5,
    paddingRight: 10,
    alignItems: 'center',
  },
  monsterHistoryInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  arrowIcon: {
    marginHorizontal: 5,
  },
});


export const help = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'IBMPlexSans-Medium',
  },
  container: {
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    marginHorizontal: 16,
    marginVertical: 5,
  },
});

export const member = StyleSheet.create({
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -3,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});


export const MonsterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
});
