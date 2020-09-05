import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

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

function HomeScreen() {
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room?city=paris"
      );
      setData(response.data);
      setIsloading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="#00ff00" />
  ) : (
    <SafeAreaView>
      <View style={styles.page}>
        <FlatList
          data={data.rooms}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <ImageBackground
                  source={{
                    uri: item.photos[0],
                  }}
                  style={styles.bgImage}
                >
                  <View style={styles.priceView}>
                    <Text style={styles.price}>{item.price} €</Text>
                  </View>
                </ImageBackground>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Room", {
                      item: item,
                    });
                  }}
                >
                  <View style={styles.informations}>
                    <View style={styles.informationsTexts}>
                      <Text numberOfLines={1} style={styles.title}>
                        {item.title}
                      </Text>
                      <View style={styles.rating}>
                        <View style={{ flexDirection: "row" }}>
                          {displayStars(item.ratingValue)}
                        </View>
                        <Text>{item.reviews} avis</Text>
                      </View>
                    </View>
                    <View>
                      <Image
                        source={{
                          uri: item.user.account.photos[0],
                        }}
                        style={styles.profilePicture}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    marginTop: 50,
  },
  container: {
    height: 300,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  priceView: {
    width: 100,
    height: 50,
    backgroundColor: "black",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    color: "white",
    fontSize: 20,
  },
  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  profilePicture: {
    height: 60,
    width: 60,
    borderRadius: 60,
    marginVertical: 10,
  },
  informations: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  informationsTexts: {
    justifyContent: "space-around",
    flex: 1,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
});

export default HomeScreen;
