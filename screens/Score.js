import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const Score = ({ navigation, route }) => {
  const { score } = route.params;
  return (
    <View style={styles.container}>
      <Text style={[styles.head, {}]}>Your Score is!</Text>
      <View
        style={{
          height: 0.5,
          width: 240,
          marginTop: 10,
          backgroundColor: "#3C687A",
        }}
      />
      <Text style={[styles.text, {}]}>{score}</Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#3C687A",
          width: 80,
          height: 80,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: 'center',
          marginTop: 100
        }}
        onPress={() => navigation.navigate('timer')}
      >
        <MaterialIcons name="replay" size={40} color="white"/>
      </TouchableOpacity>
    </View>
  );
};

export default Score;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
  },
  head: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  text: {
    color: "white",
    fontSize: 144,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 90,
  },
});
