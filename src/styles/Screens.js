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

// Timers screen styles
export const TStyles = StyleSheet.create({
  input: {},
  inputContainer: {
    marginTop: '5%',
    borderWidth: 1,
    borderColor: '#AFAFB3',
    borderRadius: 6,
    paddingLeft: 20,
  },
});

// Create timer screen styles
export const CTStyles = StyleSheet.create({
  primaryText: {
    fontSize: 18,
    color: '#606060',
    fontFamily: 'IBMPlexSans-Medium',
    marginTop: '5%',
    textAlign: 'justify',
  },
  dateInput: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 18,
    marginTop: '5%',
    borderWidth: 1,
    borderColor: '#AFAFB3',
    borderRadius: 6,
    paddingLeft: 20,
  },
  monster: {
    marginTop: '5%',
  },
  helpText: {
    fontSize: 16,
    color: '#757575',
    fontFamily: 'IBMPlexSans-Medium',
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  noteText: {
    color: '#919191',
    fontSize: 12,
  },
});


// Notifications settings styles
export const NSStyles = StyleSheet.create({
  title: {
    color: '#212529',
    fontSize: 17,
    fontFamily: 'IBMPlexSans-Medium',
  },
  inputLabel: {
    color: '#757575',
    fontFamily: 'IBMPlexSans-Regular',
  },
  inputContainer: {
    marginTop: '5%',
  },
  buttonContainer: {
    marginTop: '15%',
  },
});

// Sounds screen styles
export const SStyles = StyleSheet.create({
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: '80%',
    marginHorizontal: 5,
  },
  thumb: {
    height: 25,
    width: 25,
  },
  track: {
    height: 3,
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

// Group common styles
export const GCStyles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: '10%',
    marginBottom: '5%',
  },
  iconButtonContainer: {
    marginBottom: '10%',
  },
  iconButtonTitle: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    color: '#212121',
  },
});


export const CreateTimerStyles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 15,
  },
});

export const PremiumsStyles = StyleSheet.create({
  cardContainer: {
    borderRadius: 5,
    padding: 10,
  },
  advantageText: {
    marginLeft: 15,
    fontSize: 15,
  },
  advantageWrapper: {
    marginTop: 5,
  },
  costText: {
    fontSize: 15,
  },
});


export const ThemeSettingsStyles = StyleSheet.create({
  view: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  separator: {
    height: 15,
  },
  list: {
    marginTop: 30,
  },
});
