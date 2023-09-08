import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  DimensionValue,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isJPTH, setIsJPTH] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#0e0e0e",
          padding: 30,
          paddingVertical: 50,
          flex: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              fontSize: 25,
              color: "#ffffff",
              //backgroundColor: "#e3f",
              height: 100,
            }}
            value={searchQuery}
            onChangeText={(value) => setSearchQuery(value)}
            placeholder="Enter Text"
            placeholderTextColor={"#999999"}
            cursorColor={"#3C687A"}
          />
          <TouchableOpacity
            className="rounded-xl"
            style={{
              backgroundColor: "#3C687A",
              height: 50,
              weight: 50,
              paddingHorizontal: 30,
              justifyContent: "center",
            }}
            onPress={() => {}}
          >
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

     
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          backgroundColor: "#282828",
          paddingVertical: 50,
          flex: 1,
        }}
      >
        <TouchableOpacity
          style={[
            styles.button,
            { flex: 3, marginHorizontal: 20, justifyContent: "center" },
          ]}
        >
          <Text className="text-xl" style={{ textAlign: "center" }}>
            {isJPTH ? "Japanese" : "Thai"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}
          onPress={() => setIsJPTH(!isJPTH)}
        >
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { flex: 3, marginHorizontal: 20, justifyContent: "center" },
          ]}
        >
          <Text
            className="text-xl"
            style={{ textAlign: "center", verticalAlign: "middle" }}
          >
            {!isJPTH ? "Japanese" : "Thai"}
          </Text>
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
  button: {
    backgroundColor: "#DDDDDD",
    padding: 15,
    borderRadius: 20,
  },
});
