import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import React from "react";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { COLORS } from "../styles/COLORS";
import { useAnimatedStyle, useSharedValue, withTiming, Easing } from "react-native-reanimated";
import Animated, { concat } from "react-native-reanimated";

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isJPTH, setIsJPTH] = useState(true);
  const { height, width } = useWindowDimensions();
  const rotation = useSharedValue(0);
  const dis = searchQuery == "" ? true : false;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: withTiming(`${rotation.value}deg`, { duration: 700,
            easing: Easing.inOut(Easing.exp)
           } ),
        },
      ],
    };
  });

  const handleRotation =() => {
    rotation.value+=360
  }

  const handleOnSearch = () => {
    if (searchQuery.trim() != "") {
      navigation.navigate("Result", { searchQuery: searchQuery.trim() });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Top Container */}
      <View style={styles.topContainer}>
        <View style={styles.topContainer1}>
          <TextInput
            style={[styles.textInput, { width: width * 0.6 }]}
            value={searchQuery}
            onChangeText={(value) => setSearchQuery(value)}
            placeholder="Enter Text"
            placeholderTextColor={COLORS.dicBlack4}
            cursorColor={COLORS.dicBlue}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleOnSearch()}
            disabled={dis}
          >
            <Ionicons name="search" size={24} color={COLORS.dicWhite} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Container */}
      <View style={[styles.bottomContainer, { width: width }]}>
        <TouchableOpacity style={styles.langButton}>
          <Text style={styles.langText}>{isJPTH ? "Japanese" : "Thai"}</Text>
        </TouchableOpacity>

        <Animated.View
          style = {animatedStyles}
        >
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => {
              setIsJPTH(!isJPTH);
              handleRotation();
            }}
          >
            <AntDesign name="arrowright" size={24} color={COLORS.dicWhite} />
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity style={styles.langButton}>
          <Text style={styles.langText}>{!isJPTH ? "Japanese" : "Thai"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: COLORS.dicBlack1,
    padding: 30,
    paddingVertical: 50,
    height: "100%",
  },
  topContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: COLORS.dicBlack3,
    paddingVertical: 50,
    position: "absolute",
    bottom: 0,
  },
  langButton: {
    backgroundColor: COLORS.dicBlack2,
    padding: 15,
    borderRadius: 20,
    flex: 3,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  langText: {
    textAlign: "center",
    fontSize: 20,
    color: COLORS.dicWhite,
  },
  button: {
    backgroundColor: COLORS.dicBlue,
    height: 50,
    weight: 50,
    paddingHorizontal: 30,
    justifyContent: "center",
    borderRadius: 15,
  },
  textInput: {
    fontSize: 25,
    color: COLORS.dicWhite,
    height: 100,
  },
  arrow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
