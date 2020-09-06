import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Octicons, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

function LogIn({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState("");
  const [hidden, sethidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleClic = () => {
    sethidden(!hidden);
  };

  const handleSubmit = async () => {
    if (isLoading === false) {
      <ActivityIndicator size="large" color="#white" />;
    }
    if (email !== "") {
      if (password !== "") {
        const response = await axios.post(
          "http://localhost:3000/logIn",
          // "https://air-bnb-api-eros.herokuapp.com/logIn",

          {
            email: email,
            password: password,
          }
        );
        setData(response.data);
        setToken(response.data.token);
        setIsLoading(true);

        if (response.data.token) {
          await AsyncStorage.setItem("userToken", response.data.token);
          await AsyncStorage.setItem("_id", response.data._id);
        }
      } else {
        setErrorMessage("password is missing");
      }
    } else {
      setErrorMessage("email is missing");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <View style={styles.verticalCenter}>
          <StatusBar barStyle="light-content" />
          <View style={styles.logoHome}>
            <Octicons
              name="home"
              size={150}
              color="white"
              style={{ marginBottom: 150 }}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="white"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <View style={styles.eye}>
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="white"
                value={password}
                secureTextEntry={hidden}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
              <TouchableOpacity onPress={handleClic} style={styles.btn_eye}>
                <FontAwesome5 name="eye" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text>{errorMessage}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.btnSignUp} onPress={handleSubmit}>
              <Text
                style={{ color: "#FF495A", fontWeight: "500", fontSize: 15 }}
              >
                Se Connecter
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{ color: "white" }}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.textWhite}>Pas de compte? / S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF495A",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    height: 20,
    borderColor: "white",
    width: 300,
    borderBottomWidth: 2,
    marginBottom: 50,
  },
  textWhite: {
    color: "white",
  },
  verticalCenter: {
    alignItems: "center",
  },
  honrizontalCenter: {
    justifyContent: "center",
  },
  btnSignUp: {
    height: 40,
    width: 200,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  eye: {
    flexDirection: "row",
    position: "relative",
  },

  btn_eye: {
    position: "absolute",
    right: 5,
    top: -10,
  },
});
export default LogIn;
