import React from "react";
import { TextInput, StyleSheet } from "react-native";

const TextArea = ({ onChangeText, value, placeholderTextColor }) => {
  return (
    <TextInput
      multiline={true}
      numberOfLines={10}
      onChangeText={onChangeText}
      value={value}
      style={styles.textArea}
      placeholder="Presentez-vous en quelques lignes"
      placeholderTextColor={placeholderTextColor}
    />
  );
};
const styles = StyleSheet.create({
  textArea: {
    height: 100,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 50,
  },
});

export default TextArea;
