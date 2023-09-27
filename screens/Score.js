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
import { globalStyle } from "../styles/Global";
import { COLORS } from "../styles/COLORS";

const Score = ({ navigation, route }) => {
  const { score } = route.params;
  return (
    <View style={[globalStyle.container, {alignItems: 'center'}]}>
      <Text style={globalStyle.h1}>Your Score is!</Text>
      <View
        style={styles.line}
      />
      <Text style={[styles.text, {}]}>{score}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('timer')}
      >
        <MaterialIcons name="replay" size={40} color= {COLORS.dicWhite}/>
      </TouchableOpacity>
    </View>
  );
};

export default Score;

const styles = StyleSheet.create({
  line: {
    height: 0.5,
    width: 240,
    marginTop: 10,
    backgroundColor: COLORS.dicBlue,
  },
  text: {
    color: COLORS.dicWhite,
    fontSize: 144,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 90,
  },
  button: {
    backgroundColor: COLORS.dicBlue,
    width: 80,
    height: 80,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 100
  }
});
