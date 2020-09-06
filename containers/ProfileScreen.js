import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import TextInputs from "../components/TextInput";
import TextArea from "../components/TextArea";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const Profile = ({ userToken, setToken, userId, setUserId, navigation }) => {
  console.log("1");
  const [data, setData] = useState("");
  const [emailUpdated, setEmailUpdated] = useState("");
  const [usernameUpdated, setUsernameUpdated] = useState("");
  const [nameUpdated, setNameUpdated] = useState("");
  const [descriptionUpdated, setDescriptionUpdated] = useState("");
  const [picture, setPicture] = useState(null);
  console.log("2");

  const profilPicture = {
    uri: "https://reactnative.dev/img/tiny_logo.png",
  };
  console.log("3");

  const handleChangePicture = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      console.log("4");

      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        setPicture(result.uri);
        console.log("5");

        // try {
        //   const uri = picture;
        //   const uriParts = uri.split(".");
        //   const fileType = uriParts[1];

        //   const formData = new FormData();
        //   formData.append("photo", {
        //     uri,
        //     name: `photo.${fileType}`,
        //     type: `image/${fileType}`,
        //   });
        //   console.log("6");
        // } catch (error) {
        //   console.log(error.message);
        // }
      }
    } else {
      alert("Accès refusé");
    }
  };
  console.log("7");

  const idFinded = userId;
  console.log("idFinded->", idFinded);

  const handleSubmit = async () => {
    const response = await axios.put("http://localhost:3000/profile", {
      _id: idFinded,
      email: emailUpdated,
      account: {
        username: usernameUpdated,
        name: nameUpdated,
        description: descriptionUpdated,
      },
      // picture,
    });
    console.log("8");

    setData(response.data);
    alert(`vos données sont bien modifiées ${response.data.username}`);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.pictureUpload}>
          {!picture ? (
            <Image source={profilPicture} style={styles.image}></Image>
          ) : (
            <Image source={{ uri: picture }} style={styles.image}></Image>
          )}

          <TouchableOpacity onPress={handleChangePicture}>
            <FontAwesome name="picture-o" size={24} color="black" />
          </TouchableOpacity>
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
  pictureUpload: {
    height: 150,
    width: 150,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 100,
  },
});
