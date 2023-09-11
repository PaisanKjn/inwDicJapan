import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import setList from "C:/inwDicJapan/setList";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const VocabList = ({ navigation, route }) => {
  const [vocabLists, setVocabLists] = useState([]);
  const { user } = route.params;

  // Trigger Vocab lists fetch
  useEffect(() => {
    console.log("Current vocab user is " + user.username);
    getVocabLists();
  }, []);

  // Fetching Vocab lists
  const getVocabLists = async () => {
    console.log("GETTING THE VOCAB LISTS");
    try {
      const value = await AsyncStorage.getItem("vocabLists");
      if (value !== null) {
        _value = JSON.parse(value);
        console.log(_value);
        setVocabLists(_value);
      }
    } catch (e) {
      // error reading value
      alert("ERROR RETREIVING");
      console.log(e);
    }
    console.log("DONEZO");
  };


  // Render each vocab List
  const setView = ({ item }) => (
    <View>
      {user.username === item.username ? (
        <View
          style={{
            flexDirection: "row",
            marginBottom: 15,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: null }]}
            onPress={() => navigation.navigate("WordList", { vocabList: item })}
          >
            <Text style={styles.text}>01</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("WordList", { vocabList: item })}
          >
            <Text style={styles.text}>{item.listName}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );

  const handleOnCreate = () => {
    console.log("Open a create new word list modal");

    navigation.navigate("createList", {
      user: user.username,
      vocabLists: vocabLists,
      setVocabLists: setVocabLists
    });
  };

  // Current "setList" data is imported (needs to be changed)
  return (
    <View style={{ backgroundColor: "#3C687A", flex: 1, padding: 30 }}>
      <Text style={styles.head}>Vocab List</Text>
      <View>
        <FlatList data={vocabLists} renderItem={setView} />
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={
            () => handleOnCreate()
          }
        >
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.text}>Create a new vocab list</Text>
      </View>
    </View>
  );
};

export default VocabList;

const styles = StyleSheet.create({
  head: {
    color: "white",
    fontSize: 40,
    textAlign: "left",
    marginVertical: 10,
  },
  text: {
    fontSize: 25,
    textAlignVertical: "center",
    color: "#fff",
  },
  button: {
    backgroundColor: "#fff",
    padding: 5,
    marginRight: 15,
    borderRadius: 20,
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
});
