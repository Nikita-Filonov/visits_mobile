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

// Google auth styles
export const GAStyles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontFamily: 'IBMPlexSans-Regular',
    marginTop: '5%',
  },
  container: {
    borderRadius: 30,
    overflow: 'hidden',
    width: 40,
    alignSelf: 'center',
    marginTop: '5%',
  },
  wrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  image: {
    width: 30,
    height: 30,
  },
});

// Under timer comment styles
export const UTCStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginBottom: 10,
    marginHorizontal: 10,
    fontSize: 15,
    flex: 6,
    flexWrap: 'wrap',
  },
  close: {
    marginRight: 10,
  },
});

export const pagination = StyleSheet.create({
  page: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  container: {
    marginBottom: '5%',
    marginTop: 5,
    flexDirection: 'row',
  },
  arrowsSeparator: {
    width: 7,
  },
  itemSeparator: {
    width: 5,
  },
  list: {
    alignSelf: 'center',
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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

export const GroupSectionHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
  },
  title: {
    fontSize: 17,
    marginVertical: 15,
    marginLeft: 15,
  },
});

export const DataGridStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    borderTopWidth: 0.3,
  },
  headerWrapper: {
    padding: 5,
    paddingLeft: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    borderTopWidth: 0.3,
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
  },
  rowWrapper: {
    padding: 5,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  footerContainer: {
    height: 5,
    borderBottomWidth: 0.3,
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
