import { StyleSheet, Text, View, Animated, Pressable } from "react-native";
import React from "react";
import { COLORS } from "../styles/COLORS";
import { globalStyle } from "../styles/Global";
import { useWindowDimensions } from "react-native";
import { useCardAnimation } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";

const WordOption = () => {
  const { current } = useCardAnimation();
  const { height } = useWindowDimensions();
  return (
    <View style={styles.modalContainer}>
      <Animated.View
        style={[
          {
            height: height,
            transform: [
              {
                translateY: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, height * 0.6],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
          styles.viewAnimated,
        ]}
      >
        <View style={styles.viewContainer}>
          <View
            style={{
              borderRadius: 100,
              backgroundColor: COLORS.dicBlack3,
              width: "40%",
              height: 5,
              alignSelf: "center",
              marginTop: 10,
              marginBottom: 20,
            }}
          />

          <Pressable
            style={{ flexDirection: "row", padding: 20 }}
            android_ripple={{ foreground: true, color: COLORS.dicBlack3 }}
          >
            <FontAwesome name="trash-o" size={30} color={COLORS.dicBlack4} />
            <Text
              style={[
                globalStyle.h3,
                { marginLeft: 40, color: COLORS.dicBlack5, fontSize: 18 },
              ]}
            >
              Remove from the vocab list
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewAnimated: {
    width: "100%",
  },
  viewContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.dicBlack2,
    borderRadius: 30,
  },
  text: {
    fontSize: 25,
    textAlignVertical: "center",
    color: COLORS.dicWhite,
    marginVertical: 30,
  },
  button: {
    alignSelf: "center",
    width: "100%",
  },
});
export default WordOption;
