import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";

function SignUp({ navigation, setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [descirption, setDescirption] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [data, setData] = useState({});
  const [hidden, sethidden] = useState(true);

  const handleClic = () => {
    sethidden(!hidden);
  };

  const handleSubmitLogin = async () => {
    const response = await axios.post(
      "https://air-bnb-api-eros.herokuapp.com/sign_up",
      {
        email: email,
        username: username,
        name: name,
        descirption: descirption,
        password: password,
        passwordConfirm: passwordConfirm,
      }
    );
    setData(response.data);
    if (response.data.token) {
      await AsyncStorage.setItem("userToken", response.data.token);
    }
    if (response.data.id) {
      alert(`Welcome Home ${name}`);
    }
    setToken(data.token);
  };

  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={{ width: "90%", alignItems: "center" }}>
        <Text style={{ fontSize: 25, color: "white", marginBottom: 50 }}>
          Rejoignez-nous !
        </Text>
        {/* bloc of 3rd first */}
        <View style={{ width: "100%" }}>
          <TextInput
            style={styles.textInputUser}
            placeholder="Email"
            placeholderTextColor="white"
            onChangeText={setEmail}
            value={email}
          ></TextInput>
          <TextInput
            style={styles.textInputUser}
            placeholder="username"
            placeholderTextColor="white"
            onChangeText={setUsername}
            value={username}
          ></TextInput>
          <TextInput
            style={styles.textInputUser}
            placeholder="Name"
            placeholderTextColor="white"
            onChangeText={setName}
            value={name}
          ></TextInput>
        </View>

        {/* bloc of Textarea */}
        <View style={{ width: "100%" }}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            onChangeText={setDescirption}
            value={descirption}
            style={styles.textArea}
            placeholder="Presentez-vous en quelques lignes"
            placeholderTextColor="white"
          />
        </View>

        {/* bloc of Password */}
        {/* <View style={{ width: "100%", position: "relative" }}> */}
        <View style={styles.eye}>
          <TextInput
            style={styles.textInputPassword}
            placeholder="Mot de passe"
            placeholderTextColor="white"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={hidden}
          ></TextInput>
          <TouchableOpacity onPress={handleClic} style={styles.btn_eye}>
            <FontAwesome5 name="eye" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.eye}>
          <TextInput
            style={styles.textInputPassword}
            placeholder="Confirmez le Mot de passe"
            placeholderTextColor="white"
            onChangeText={setPasswordConfirm}
            value={passwordConfirm}
            secureTextEntry={hidden}
          ></TextInput>
          <TouchableOpacity onPress={handleClic} style={styles.btn_eye}>
            <FontAwesome5 name="eye" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {/* </View> */}
        <View>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={handleSubmitLogin}
          >
            <Text style={{ color: "#FF495A", fontWeight: "500", fontSize: 15 }}>
              S'inscrire
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{ color: "white" }}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.textWhite}>
              Vous avez deja un compte? / Se connecter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF495A",
  },
  textInputUser: {
    height: 20,
    borderColor: "white",
    borderBottomWidth: 1,
    marginBottom: 50,
  },
  textArea: {
    height: 100,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 50,
  },
  textInputPassword: {
    height: 20,
    width: "100%",
    borderColor: "white",
    borderBottomWidth: 1,
    marginBottom: 50,
  },
  buttonLogin: {
    height: 40,
    width: 200,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textWhite: {
    color: "white",
  },
  alert: {
    color: "red",
  },
  eye: {
    flexDirection: "row",
    width: "100%",
    position: "relative",
  },

  btn_eye: {
    position: "absolute",
    right: 5,
    top: -10,
  },
});
export default SignUp;
