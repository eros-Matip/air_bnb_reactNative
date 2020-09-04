import React from "react";
import { TextInput, StyleSheet } from "react-native";

const TextInputs = ({
  placeholder,
  onChangeText,
  value,
  placeholderTextColor,
}) => {
  return (
    <TextInput
      style={styles.textInputUser}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      value={value}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  textInputUser: {
    height: 20,
    width: "90%",
    borderBottomWidth: 1,
    marginBottom: 50,
  },
});

export default TextInputs;
