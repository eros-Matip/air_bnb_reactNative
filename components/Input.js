import React from "react";
import { StyleSheet } from "react-native";

const Input = ({ placeholder, value }) => {
  return (
    <TextInputs
      placeholder={placeholder}
      value={value}
      placeholderTextColor="pink"
      style={styles.inputBorder}
    />
  );
};

const styles = StyleSheet.create({
  inputBorder: {
    borderBottomColor: "#FF495A",
    width: "90%",
  },
});

export default Input;
