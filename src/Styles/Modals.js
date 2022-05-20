import {Dimensions, StyleSheet} from 'react-native';

// Select image styles
export const SIStyles = StyleSheet.create({
  list: {
    marginTop: '10%',
  },
  separator: {
    width: 15,
  },
  image: {
    width: 50,
    height: 50,
  },
  selectedImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: '#0DAADE',
  },
});


export const DefaultModalStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  wrapper: {
    width: Dimensions.get('window').width - 40,
    borderRadius: 8,
    paddingHorizontal: 16,
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    marginBottom: 10,
    elevation: 3,
    maxHeight: Dimensions.get('window').height / 1.7,
    paddingVertical: 15,
  },
  fullWrapper: {
    width: '100%',
    height: '100%',
  },
  modalFullScreen: {
    margin: 0,
  },
});
