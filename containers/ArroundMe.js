import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import LottieView from "lottie-react-native";
import Axios from "axios";
import { Entypo } from "@expo/vector-icons";

export default function Arround() {
  const [coords, setCoords] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const FetchData = async () => {
      const response = await Axios(
        `https://airbnb-api.herokuapp.com/api/room/around/Paris?latitude=${coords.latitude}&longitude=${coords.longitude}`
      );
      setData(response.data);
    };
    const askPermission = async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        setCoords(obj);
      } else {
        setErrorMsg(true);
      }
    };
    askPermission();
    setIsLoading(false);
    FetchData();
  }, [hidden]);

  const handleClick = () => {
    setHidden(!hidden);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.page}>
        {isLoading ? (
          <LottieView
            style={{ flex: 1 }}
            //   ref={play(30, 120)}
            source={require("../assets/homeWaiting.json")}
          />
        ) : errorMsg ? (
          <Text>Permission denied</Text>
        ) : (
          <MapView
            style={styles.mapStyle}
            showsUserLocation={true}
            initialRegion={{
              latitude: 48.856614,
              longitude: 2.3222219,
              latitudeDelta: 0.3,
              longitudeDelta: 0.3,
            }}
          >
            {data.map((item, index) => {
              return (
                <MapView.Marker
                  coordinate={{
                    longitude: item.loc[0],
                    latitude: item.loc[1],
                  }}
                  key={index}
                />
              );
            })}
            <TouchableHighlight onPress={handleClick}>
              <Entypo
                name="location-pin"
                size={44}
                color="#FF495A"
                style={{ position: "absolute", bottom: 60, right: 10 }}
              />
            </TouchableHighlight>
            {/* </View> */}
          </MapView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
