import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet, ImageBackground } from "react-native";
import TextInputs from "../components/TextInput";
import TextArea from "../components/TextArea";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const Profile = ({ setToken, userId, setUserId, navigation }) => {
  const [data, setData] = useState("");
  const [emailUpdated, setEmailUpdated] = useState("");
  const [usernameUpdated, setUsernameUpdated] = useState("");
  const [nameUpdated, setNameUpdated] = useState("");
  const [descriptionUpdated, setDescriptionUpdated] = useState("");
  const profilPicture = {
    uri: "https://reactnative.dev/img/tiny_logo.png",
  };

  const idFinded = userId;
  console.log("userId->", idFinded);

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:3000/profile", {
      _id: idFinded,
      email: emailUpdated,
      account: {
        username: usernameUpdated,
        name: nameUpdated,
        description: descriptionUpdated,
      },
    });
    setData(response.data);
    alert(`vos données sont bien modifiées ${response.data.username}`);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.picture}>
          <ImageBackground
            source={profilPicture}
            style={styles.image}
          ></ImageBackground>
        </View>
        <TextInputs
          placeholder="email"
          onChangeText={(text) => {
            setEmailUpdated(text);
          }}
          value={emailUpdated}
          placeholderTextColor="black"
          style={styles.inputBorder}
        />
        <TextInputs
          placeholder="username"
          onChangeText={(text) => {
            setUsernameUpdated(text);
          }}
          value={usernameUpdated}
          placeholderTextColor="black"
          style={styles.inputBorder}
        />

        <TextInputs
          placeholder="Name"
          onChangeText={(text) => {
            setNameUpdated(text);
          }}
          value={nameUpdated}
          placeholderTextColor="black"
          style={styles.inputBorder}
        />
        <View style={styles.textArea}>
          <TextArea
            onChangeText={(text) => {
              setDescriptionUpdated(text);
            }}
            value={descriptionUpdated}
            placeholderTextColor="black"
          />
        </View>

        <Button title="Mettre à jour" onPress={handleSubmit} />
        <Button
          title="Se Deconnecter"
          onPress={async () => {
            setToken(null);
            setUserId(null);
            await AsyncStorage.removeItem("userToken");
            await AsyncStorage.removeItem("_id");
          }}
        />
      </View>
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
  container: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },

  inputBorder: {
    borderBottomColor: "#FF495A",
    width: "90%",
  },
  textArea: {
    width: "100%",
    borderColor: "#FF495A",
    justifyContent: "center",
    alignItems: "center",
  },
  picture: {
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 50,
  },
  image: {
    height: "50%",
    width: "50%",
  },
});
