import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import TextInputs from "../components/TextInput";
import TextArea from "../components/TextArea";
import Password from "../components/Password";
import Confirm from "../components/ConfirmPassword";

function SignUp({ navigation, setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [data, setData] = useState({});

  const handleSubmitLogin = async () => {
    const response = await axios.post(
      "http://localhost:3000/sign_up",
      // "https://air-bnb-api-eros.herokuapp.com/sign_up",
      {
        email: email,
        account: {
          username: username,
          name: name,
          description: description,
        },
        password: password,
        passwordConfirm: passwordConfirm,
      }
    );
    setData(response.data);
    if (response.data.token) {
      await AsyncStorage.setItem("userToken", response.data.token);
      await AsyncStorage.setItem("_id", response.data.id);
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
          <TextInputs
            placeholder="email"
            onChangeText={setEmail}
            value={email}
            placeholderTextColor="white"
            style={styles.inputBorder}
          />
          <TextInputs
            placeholder="username"
            onChangeText={setUsername}
            value={username}
            placeholderTextColor="white"
            style={styles.inputBorder}
          />

          <TextInputs
            placeholder="Name"
            onChangeText={setName}
            value={name}
            placeholderTextColor="white"
            style={styles.inputBorder}
          />
        </View>

        {/* bloc of Textarea */}

        <View style={{ width: "100%" }}>
          <TextArea
            onChangeText={setDescription}
            value={description}
            placeholderTextColor="white"
          />
        </View>

        {/* bloc of Password */}

        <View style={{ width: "100%", position: "relative" }}>
          <View style={styles.eye}>
            <Password
              onChangeText={setPassword}
              value={password}
              placeholderTextColor="white"
            />
          </View>

          <View style={styles.eye}>
            <Confirm
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
              placeholderTextColor="white"
            />
          </View>
        </View>
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

  inputBorder: {
    borderColor: "white",
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
