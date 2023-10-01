import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Global from "../styles/Global";

const Redirect = ({ navigation }) => {
  return (
    <View style={[Global.container, { justifyContent: "center" }]}>
      <View style={styles.topContainer}>
        <Ionicons name="ios-warning" size={90} color="#999999" />
        <Text style={styles.disabledText}>
          You need an account to use this feature
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[Global.buttonMain]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={Global.textButton}>Log In</Text>
        </TouchableOpacity>
        <Text style={{ color: "#999", marginVertical: 10 }}>Or</Text>
        <TouchableOpacity
          style={[Global.buttonSub]}
          onPress={() => navigation.goBack()}
        >
          <Text style={Global.textButton}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Redirect;

const styles = StyleSheet.create({
  topContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  disabledText: {
    fontSize: 15,
    color: "#999",
    marginVertical: 25,
  },
});
