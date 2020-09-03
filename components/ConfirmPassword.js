import React, { useState } from "react";
import { TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Confirm = ({ onChangeText, value, placeholderTextColor }) => {
  const [hidden, sethidden] = useState(true);

  const handleClic = () => {
    sethidden(!hidden);
  };
  return (
    <>
      <TextInput
        style={styles.textInputPassword}
        placeholder="Confirmez le Mot de passe"
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={hidden}
      ></TextInput>
      <TouchableOpacity onPress={handleClic} style={styles.btn_eye}>
        <FontAwesome5 name="eye" size={24} color="black" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  textInputPassword: {
    height: 20,
    width: "100%",
    borderColor: "white",
    borderBottomWidth: 1,
    marginBottom: 50,
  },
});

export default Confirm;
