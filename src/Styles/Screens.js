import {StyleSheet} from 'react-native';

// Login screen styles
export const LPStyles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontFamily: 'IBMPlexSans-Bold',
    marginTop: '5%',
    marginBottom: '10%',
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: '20%',
  },
  continueWith: {
    textAlign: 'center',
    fontFamily: 'IBMPlexSans-Medium',
    marginTop: '5%',
  },
  googleContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    width: 40,
    alignSelf: 'center',
    marginTop: '5%',
  },
  googleWrapper: {
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
  alreadyMember: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  alreadyMemberText: {
    fontFamily: 'IBMPlexSans-Light',
  },
  alert: {
    marginBottom: 10,
  },
});

// Welcome screen styles
export const WStyles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: '15%',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: '15%',
  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: '10%',
  },
  regTitle: {
    fontSize: 17,
    fontFamily: 'IBMPlexSans-Medium',
  },
  regButton: {
    marginTop: '10%',
  },
  authContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%',
    alignItems: 'center',
  },
  authText: {
    fontSize: 17,
    fontFamily: 'IBMPlexSans-Medium',
  },
  authTitle: {
    fontSize: 17,
    fontFamily: 'IBMPlexSans-Medium',
    color: '#4169E1',
  },
});

export const MyQRCodeStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
});
