import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import TextInputs from "../components/TextInput";
import TextArea from "../components/TextArea";

const Profile = ({ setToken }) => {
  return (
    <View style={styles.page}>
      <TextInputs
        placeholder="email"
        // onChangeText={setEmail}
        // value={email}
        placeholderTextColor="#FF495A"
        style={styles.inputBorder}
      />
      <TextInputs
        placeholder="username"
        // onChangeText={setUsername}
        // value={username}
        placeholderTextColor="#FF495A"
        style={styles.inputBorder}
      />

      <TextInputs
        placeholder="Name"
        // onChangeText={setName}
        // value={name}
        placeholderTextColor="#FF495A"
        style={styles.inputBorder}
      />
      <View style={{ width: "100%" }}>
        <TextArea
          // onChangeText={setDescirption}
          // value={descirption}
          placeholderTextColor="#FF495A"
        />
      </View>

      <Button
        title="Se Deconnecter"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  page: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "black",
    borderBottomWidth: 1,
    marginBottom: 50,
    width: "100%",
  },
  inputBorder: {
    borderColor: "#FF495A",
    width: "90%",
  },
});
