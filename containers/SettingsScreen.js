import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";

export default function SettingsScreen({ setToken }) {
  return (
    <View style={styles.page}>
      <Text>Hello Settings</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
