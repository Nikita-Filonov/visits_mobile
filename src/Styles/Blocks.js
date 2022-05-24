import {Dimensions, StyleSheet} from 'react-native';

export const comp = StyleSheet.create({
  header: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  colorHeader: {
    backgroundColor: '#4169E1',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  viewContainer: {
    marginHorizontal: 16,
  },
  smallViewContainer: {
    marginHorizontal: 8,
  },
  input: {
    marginTop: 10,
  },
  bottomList: {
    marginBottom: 20,
  },
  container: {
    height: '100%',
  },
  spinner: {
    alignSelf: 'center',
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  background: {
    backgroundColor: '#4169E1',
  },
  image: {
    borderRadius: 6,
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 36,
  },
  fabLeft: {
    position: 'absolute',
    left: 0,
    bottom: 36,
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  normalText: {
    fontSize: 17,
  },
  smallText: {
    fontSize: 16,
  },
  captionText: {
    fontSize: 13,
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  scrollViewCenter: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export const drawer = StyleSheet.create({
  itemText: {
    color: 'white',
    fontFamily: 'IBMPlexSans-Bold',
    fontSize: 18,
  },
  socialContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
  },
  socialTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'IBMPlexSans-Medium',
    marginBottom: 10,
  },
});

export const touchable = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 30,
  },
  wrapper: {
    height: 35,
    width: 35,
    borderRadius: 30,
    justifyContent: 'center',
  },
});

// Empty List styles
export const ListEmptyStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height / 2,
  },
  textWrapper: {
    marginTop: 20,
    marginHorizontal: 40,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    height: 100,
    width: 100,
  },
});

export const loader = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#42C467',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'Roboto-Medium',
    marginTop: '70%',
  },
  separator: {
    width: 15,
  },
});

export const AlertMessageStyles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
  },
  message: {
    fontSize: 14,
    marginLeft: 15,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export const DrawerItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 4,
    marginVertical: 5,
  },
  icon: {
    marginLeft: 12,
  },
  text: {
    marginLeft: 30,
  },
  badgeContainer: {
    flex: 1,
    marginRight: 10,
  },
});

export const DrawerHeaderStyles = StyleSheet.create({
  imageContainer: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  usernameContainer: {
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  accountImage: {
    width: 20,
    height: 20,
    borderRadius: 15,
    alignSelf: 'center',
  },
  accountTitle: {
    marginLeft: 7,
  },
  accountItem: {
    marginHorizontal: 7,
  },
  divider: {
    marginBottom: 10,
  },
});

export const QRCodeScannerStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  target: {
    marginTop: 5,
    width: 220,
    height: 220,
    borderRadius: 7,
    borderColor: '#FFFFFF',
    borderWidth: 5,
  },
});

export const UserPairsFabStyles = StyleSheet.create({
  container: {
    paddingRight: 16,
    paddingBottom: 36,
  },
});

export const VisitScoreItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
  },
  scoreDot: {
    width: 20,
    height: 20,
    borderRadius: 15,
  },
});

export const VisitScoreInfoStyles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 4,
  },
  resultTitle: {
    fontSize: 17,
  },
});
