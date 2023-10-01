import {
  StyleSheet,
  Text,
  View,
  Animated,
  Alert,
  Pressable,
} from "react-native";
import React from "react";
import { COLORS } from "../styles/COLORS";
import { globalStyle } from "../styles/Global";
import { useWindowDimensions } from "react-native";
import { useCardAnimation } from "@react-navigation/stack";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import Dialog from "react-native-dialog";

const ListOption = () => {
  const { current } = useCardAnimation();
  const { height } = useWindowDimensions();
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };

  const confirmRemove = () => {
    Alert.alert("Remove the list?", "Are you sure to remove your list?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

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
            android_ripple={{ foreground: true, color: COLORS.dicBlack3}}
            onPress={confirmRemove}
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

          <Pressable
            style={{ flexDirection: "row", padding: 20 }}
            android_ripple={{ foreground: true, color: COLORS.dicBlack3}}
            onPress={showDialog}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={30}
              color={COLORS.dicBlack4}
            />
            <Text
              style={[
                globalStyle.h3,
                { marginLeft: 33, color: COLORS.dicBlack5, fontSize: 18 },
              ]}
            >
              Remove from the vocab list
            </Text>
          </Pressable>
          <Dialog.Container visible={visible}>
            <Dialog.Title>Account delete</Dialog.Title>
            <Dialog.Description>
              Do you want to delete this account? You cannot undo this action.
            </Dialog.Description>
            <Dialog.Input />
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="Confirm" onPress={handleConfirm} />
          </Dialog.Container>
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
export default ListOption;
