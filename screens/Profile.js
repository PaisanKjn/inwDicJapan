import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation, route }) => {
  const { user } = route.params;
  //const _user = JSON.stringify(user)
  const handleOnLogOut = async () => {
    await AsyncStorage.removeItem("appUser");
    alert("Log out");
    navigation.navigate("Drawer");
    route.params.setUser();
  };

  return (
    <View style={[{ backgroundColor: "#0e0e0e", flex: 1 }]}>
      <View style={[{ flexDirection: "row" }]}>
        <TouchableOpacity
          style={[styles.circle, { marginTop: 50, marginLeft: 40 }]}
          className="text-xl"
        >
          <Image
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
            style={{ width: 80, height: 80, margin: 10, resizeMode: "cover" }}
          />
        </TouchableOpacity>
        <Text style={styles.head}>{user.username}</Text>
      </View>
      <View
        style={{
          margin: 30,
          marginTop: 100,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity onPress={handleOnLogOut}>
          <Text style={[styles.button]} className="text-xl">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  head: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    marginTop: 75,
    marginLeft: 50,
    fontWeight: "500",
  },
  button: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    backgroundColor: "white",
    width: 100,
    height: 35,
    borderRadius: 100,
  },
  circle: {
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 100,
  },
});
