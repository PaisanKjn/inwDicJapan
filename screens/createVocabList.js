import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Button,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useCardAnimation } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../styles/COLORS";
import Global from "../styles/Global";
import { useRef } from "react";

const CreateVocabList = ({ navigation, route }) => {
  const { current } = useCardAnimation();
  const { height } = useWindowDimensions();
  const [listName, setListName] = useState("");
  const { userID, vocabLists } = route.params;
 
  const inputRef = useRef();

  useEffect(() => {

  }, []);

  const handleOnSubmit = () => {
    // 1.loop the vocabLists data to see if the list already exists
    // 2. if not, save to DB using user ID
    // 3. navigate back
    if (isAlreadyExisted()) {
      alert("That name is already existed");
    } else {
      saveToDB();
    }
  };

  const saveToDB = async () => {
    try {
      await fetch("http://192.168.1.100:8080/vocablist", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify({
          user_id: userID,
          name: listName,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(JSON.stringify(responseData));
        })
        .done();
  
      handleFinish();
    } catch (e) {
      console.log("Error creating a vocab list", e);
    }
  };

  const handleFinish = (updatedVocabLists) => {
    navigation.navigate("VocabList"); // might not be able to make the vocab list re-render *sad face*
    alert("Vocab list created");
  };

  const isAlreadyExisted = () => {
    // if there is no vocabLists in the first place
    if(vocabLists == null) {
      return false;
    } else {
      // looping through vocabList item to check their name
      for (let i = 0; i < vocabLists.length; i++) {
        if(vocabLists[i].name == listName) return true;
      }
      return false;
    }
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
                  outputRange: [height, height * 0.3],
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

          <View style = {{padding: 20}}>
            <Text style = {{color: COLORS.dicBlack5, fontWeight:800}}>Create A New Word List</Text>
            <TextInput
              style={styles.text}
              value={listName}
              placeholder="Enter a new word list name"
              onChangeText={(value) => setListName(value)}
              placeholderTextColor={COLORS.dicBlack4}
              cursorColor={COLORS.dicBlue}
              ref={inputRef}
              onLayout={() => inputRef.current.focus()}
            />
            <TouchableOpacity
              style={[
                Global.buttonMain,
                styles.button,
                { marginBottom: 20 },
              ]}
              mode="contained"
              onPress={() => handleOnSubmit()}
            >
              <Text style={{ color: COLORS.dicWhite }}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Global.buttonSub,
                styles.button,
                { backgroundColor: COLORS.dicBlack3 },
              ]}
              mode="contained"
              onPress={() => {
                navigation.goBack();
                Keyboard.dismiss();
              }}
            >
              <Text style={{ color: COLORS.dicWhite }}>Close</Text>
            </TouchableOpacity>
          </View>
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
export default CreateVocabList;
