import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Home = () => {
  return (
    <View style={{ backgroundColor: "#0e0e0e", padding:20 }}>
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          paddingTop: 50,
          
        }}
      >
        <TextInput
          style={{ fontSize: 25, color: "#ffffff" }}
          // value={username}
          // onChangeText={(value) => setUsername(value)}
          placeholder="Enter Text"
        />
        <TouchableOpacity
          className="m-3 rounded-xl"
          onPress={() => {}}
        >
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          paddingVertical: 400,
          
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {}}
        >
          <Text className="text-xl">Japanese</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {}}
        >
          <AntDesign name="arrowright" size={24} color="white"/>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {}}
        >
          <Text className="text-xl" >Thai</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    fontSize: 24,
    backgroundColor: "white",
    width: 100,
    height: 35,
  },
  button:{
    backgroundColor: "#DDDDDD",
    padding:20,
    borderRadius: 20,
  },
});
