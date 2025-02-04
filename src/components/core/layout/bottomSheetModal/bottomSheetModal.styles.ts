import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  sheetView: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    zIndex: 9999999,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 9999999,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%'
  },
  bottomSheet: {
    zIndex: 99999
  }
});