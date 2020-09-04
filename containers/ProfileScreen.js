import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet, ImageBackground } from "react-native";
import TextInputs from "../components/TextInput";
import TextArea from "../components/TextArea";
import axios from "axios";
const Profile = ({ setToken, userId }) => {
  const [data, setData] = useState("");
  const [emailUpdated, setEmailUpdated] = useState("");
  const [usernameUpdated, setUsernameUpdated] = useState("");
  const [nameUpdated, setNameUpdated] = useState("");
  const [descriptionUpdated, setDescriptionUpdated] = useState("");
  const profilPicture = {
    uri: "https://reactnative.dev/img/tiny_logo.png",
  };

  const idFinded = "5f3ed9e7f4f3d877d5a83b55";
  console.log("userId->", idFinded);
  const nameBloc = "eros@eros.com";
  const userNameBloc = "eros";
  const descriptionBloc = "blablabla";

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:3000/profile", {
      _id: idFinded,
      email: nameBloc,
      account: {
        username: userNameBloc,
        name: nameBloc,
        description: descriptionBloc,
      },
    });
    console.log("response->", response.data);
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
            setEmail(text);
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
          onPress={() => {
            setToken(null);
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
