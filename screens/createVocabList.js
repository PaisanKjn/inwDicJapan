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
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
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
            style={{
              marginBottom: 20,
              padding: 5,
              borderRadius: 12,
              backgroundColor: "#3C687A",
              alignItems: "center",
            }}
            mode="contained"
            onPress={() => handleOnSubmit()}
          >
            <Text style={{ color: "white" }}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginBottom: 20,
              padding: 5,
              borderRadius: 12,
              borderColor: "#3C687A",
              borderWidth: 2,
              alignItems: "center",
            }}
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
  viewAnimated: {
    width: "100%",
  },
  viewContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#E5E5E5",
    borderRadius: 20,
  },
  text: {
    fontSize: 25,
    textAlignVertical: "center",
    color: "#0e0e0e",
    marginVertical: 30,
  },
});
export default CreateVocabList;
