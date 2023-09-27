import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Button,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useCardAnimation } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../styles/COLORS";
import { globalStyle } from "../styles/Global";

const CreateVocabList = ({ navigation, route }) => {
  const { current } = useCardAnimation();
  const { height } = useWindowDimensions();
  const [listName, setListName] = useState("");
  const { user, vocabLists, setVocabLists} = route.params;
  const vocabList = {
    username: user,
    listName: listName,
    vocab: [],
  };
  

  useEffect(()=> {
    console.log('USER IS ');
  console.log(user);

  }, []) 

  const handleOnSubmit = () => {
    if (isAlreadyExisted()) {
      alert("That name is already existed");
    } else {
      handleSubmit();
    }

    //AsyncStorage.removeItem('vocabLists')
  };


  const handleSubmit = async () => {
    try {
      const updatedVocabLists = [...vocabLists, vocabList];
    setVocabLists(updatedVocabLists);
    await AsyncStorage.setItem("vocabLists", JSON.stringify(updatedVocabLists));
    console.log('CREATED YAY')
    handleFinish(updatedVocabLists);
    } catch(e) {
      console.log(e)
    }
    
  };

  const handleFinish = (updatedVocabLists) => {
    navigation.navigate("VocabList", {updatedVocabLists: updatedVocabLists});
    alert("Vocab list created");
  }

  const isAlreadyExisted = () => {

    if(!vocabLists) {
      return false
    }
     const result = vocabLists.filter((vocabLists) => {
      if (listName == vocabLists.listName && user == vocabLists.username) {
        return vocabLists;
      }
     })
     return result.length > 0 ? true : false;
  };

  return (
    <View
      style={styles.modalContainer}
    >
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
          <Text>Create A New Word List</Text>
          <TextInput
            style={styles.text}
            value={listName}
            placeholder="Enter a new word list name"
            onChangeText={(value) => setListName(value)}
          />
          <TouchableOpacity
            style={[globalStyle.buttonMain, styles.button, {marginBottom: 20}]}
            mode="contained"
            onPress={() => handleOnSubmit()}
          >
            <Text style={{ color: COLORS.dicWhite }}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyle.buttonSub, styles.button]}
            mode="contained"
            onPress={navigation.goBack}
          >
            <Text style={{ color: "#3C687A" }}>Close</Text>
          </TouchableOpacity>
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
    backgroundColor: COLORS.dicWhite,
    borderRadius: 20,
  },
  text: {
    fontSize: 25,
    textAlignVertical: "center",
    color: COLORS.dicBlack1,
    marginVertical: 30,
  },
  button: {
    alignSelf: 'center',
    width: '100%'
  }
});
export default CreateVocabList;
