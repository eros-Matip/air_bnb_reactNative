import React, { useState } from "react";
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
  const [data, setData] = useState("");
  const [emailUpdated, setEmailUpdated] = useState("");
  const [usernameUpdated, setUsernameUpdated] = useState("");
  const [nameUpdated, setNameUpdated] = useState("");
  const [descriptionUpdated, setDescriptionUpdated] = useState("");
  const [pictureUpdated, setPictureUpdated] = useState(null);

  const profilPicture = {
    uri: "https://reactnative.dev/img/tiny_logo.png",
  };
  const handleChangePicture = async () => {
    console.log("1");
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      console.log("2");

      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        console.log("3");

        setPictureUpdated(result.uri);
        console.log("4");

        const uri = result.uri;
        console.log("5");

        const uriParts = uri.split(".");
        console.log("6");

        const fileType = uriParts[1];
        console.log("7");

        const formData = new FormData();
        console.log("8");

        formData.append("photo", {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
        console.log("9");

        const sendPhoto = await axios.put(
          "http://localhost:3000/profile",
          formData,
          {
            _id: idFinded,
            picture: pictureUpdated,
          }
        );
        console.log("10");

        console.log("sendPhoto->", sendPhoto);
        if (sendPhoto.data.photo[0].url) {
          console.log("11");

          alert("Photo envoyée");
        }
      }
    } else {
      alert("Accès refusé");
    }
  };

  const idFinded = userId;

  const handleSubmit = async () => {
    const response = await axios.put(
      "http://localhost:3000/profile",

      {
        _id: idFinded,
        email: emailUpdated,
        username: usernameUpdated,
        name: nameUpdated,
        description: descriptionUpdated,
      }
    );

    setData(response.data);
    alert(`vos données sont bien modifiées ${response.data.username}`);
    navigation.navigate("Home");
  };
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.pictureUpload}>
          {!pictureUpdated ? (
            <Image source={profilPicture} style={styles.image}></Image>
          ) : (
            <Image
              source={{ uri: pictureUpdated }}
              style={styles.image}
            ></Image>
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
