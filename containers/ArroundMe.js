import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import axios from "axios";

function AroundMeScreen({ navigation }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPermissionAndLocation = async () => {
      const { status } = await Location.requestPermissionsAsync();
      //   console.log(status);

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        // console.log(location);
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setIsLoading(false);

        // console.log("location.coords.latitude ==> ", location.coords.latitude);
        // console.log(
        //   "location.coords.longitude ==> ",
        //   location.coords.longitude
        // );
        // console.log(latitude); // null
        // console.log(longitude); // null

        try {
          const response = await axios.get(
            `https://airbnb-api.herokuapp.com/api/room/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );

          const tab = [];
          setData(response.data);

          for (let i = 0; i < response.data.length; i++) {
            tab.push({
              latitude: response.data[i].loc[1],
              longitude: response.data[i].loc[0],
              id: response.data[i]._id,
            });
          }
          setCoords(tab);
        } catch (e) {
          alert("Une erreur est survenue");
        }
      }
    };

    getPermissionAndLocation();
  }, []);

  return isLoading ? (
    <Text>Chargement en cours...</Text>
  ) : (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation
    >
      {coords &&
        coords.map((item, index) => {
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              onPress={() => {
                // navigation.navigate("Room2", { id: item.id });
              }}
            />
          );
        })}
    </MapView>
  );
}

export default AroundMeScreen;

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});
