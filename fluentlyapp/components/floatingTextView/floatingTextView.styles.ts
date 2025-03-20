import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      position: "absolute",
      width: "100%",
      height: "100%",
      overflow: "hidden"
    },
    textWrapper: {
      position: "absolute",
      left: -100
    },
    text: {
      fontSize: 20,
      zIndex: 1,
      fontWeight: "bold"
    },
  });