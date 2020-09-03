import React from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View, ImageBackground, StyleSheet, Image } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import MapView from "react-native-maps";

export default function RoomScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();

  const image = {
    uri: params.item.photos[0],
  };
  const userPicture = {
    uri: params.item.user.account.photos[0],
  };
  const displayStars = (num) => {
    const tab = [];

    for (let index = 1; index <= 5; index++) {
      if (num < index) {
        tab.push(<Entypo name="star" size={24} color="grey" key={index} />);
      } else {
        tab.push(<Entypo name="star" size={24} color="#FFB100" key={index} />);
      }
    }
    return tab;
  };

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerDispach}>
          <Ionicons
            name="ios-arrow-back"
            size={35}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerText}>Room</Text>
        </View>
      </View>
      <ImageBackground source={image} style={{ width: "100%", height: 300 }} />
      <View style={styles.userDescription}>
        <View>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 22,
              marginVertical: 10,
            }}
            numberOfLines={1}
          >
            {params.item.title}
          </Text>
          <View style={styles.flexDirection}>
            <View style={{ flexDirection: "row" }}>
              {displayStars(params.item.ratingValue)}
            </View>
            <Text style={{ marginLeft: 10 }}>{params.item.reviews} avis</Text>
          </View>
        </View>
        <Image source={userPicture} style={styles.profilPicture}></Image>
      </View>
      <Text numberOfLines={5} style={styles.description}>
        {params.item.user.account.description}
      </Text>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: params.item.loc[1],
            longitude: params.item.loc[0],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation={true}
        >
          <MapView.Marker
            coordinate={{
              longitude: params.item.loc[0],
              latitude: params.item.loc[1],
            }}
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    width: "100%",
    paddingTop: 30,
    backgroundColor: "#FF495A",
    alignItems: "center",
    flexDirection: "row",
  },
  headerText: {
    fontSize: 25,
    fontWeight: "500",
    color: "white",
  },

  headerDispach: {
    width: "59%",
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  profilPicture: {
    height: 70,
    width: 70,
    borderRadius: 70,
  },
  userDescription: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 20,
  },
  flexDirection: {
    flexDirection: "row",
  },
  description: {
    paddingHorizontal: 15,
    fontSize: 20,
  },
  mapStyle: {
    width: "90%",
    height: 150,
  },
});
