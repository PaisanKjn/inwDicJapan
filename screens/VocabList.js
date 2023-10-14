import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import setList from "../setList.json";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../styles/COLORS";
import Global from "../styles/Global";

const Stack = createNativeStackNavigator();

const VocabList = ({ navigation, route }) => {
  const [vocabLists, setVocabLists] = useState([]);
  const { user } = route.params;
  const [userID, setUserID] = useState(0);

  // Trigger Vocab lists fetch
  useEffect(() => {
    fetchUserID();
  }, []);

  // Fetching User ID (so we can fetch the whole vocab lists)
  const fetchUserID = async () => {
    try {
      const response = await fetch('http://localhost:8080/user?name=' + user.username + '&password=' + user.password)
      const data = await response.json();
      getVocabLists(data.user.id);
      setUserID(data.user.id)
    } catch(e) {
      console.log('Error fetching user ID', e);
    }
  }

  // Fetching Vocab lists
  const getVocabLists = async (userID) => {
    console.log("GETTING THE VOCAB LISTS");
    try {
      const response = await fetch('http://localhost:8080/vocablist?user_id=' + userID)
      const data = await response.json();
      setVocabLists(data);

    } catch (e) {
      // error reading value
      alert("Error fetching vocab lists", e);
    }
    console.log("DONEZO");
  };

  // Render each vocab List
  const setView = ({ item }) => (
    <View>
    
        <Pressable
          onPress={() => navigation.navigate("WordList", { vocabListID: item.id, listName: item.name })}
          onLongPress={() => navigation.navigate("listOption")}
          android_ripple={{ foreground: true, color: COLORS.dicBlack3 }}
          style={{
            backgroundColor: COLORS.dicBlack2,
            padding: 20,
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text style={styles.text}>{item.name}</Text>
          <AntDesign name="right" size={30} color={COLORS.dicBlack4} />
        </Pressable>
     
    </View>
  );

  // Create a new vocab list modal
  const handleOnCreate = () => {
    console.log("Open a create new word list modal");

    navigation.navigate("createList", {
      userID: userID,
      vocabLists: vocabLists,
    });
  };

  // use "setList" for sample data otherwise use "vocabLists"
  return (
    <View style={[styles.container]}>
      <View>
        <FlatList data={vocabLists} renderItem={setView} />
      </View>

      
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleOnCreate()}
        >
          <AntDesign name="plus" size={24} color= {COLORS.dicWhite} />
        </TouchableOpacity>

    </View>
  );
};

export default VocabList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dicBlack1,
    flex: 1,
    paddingTop: 30,
  },
  head: {
    color: COLORS.dicWhite,
    fontSize: 40,
    textAlign: "left",
    marginVertical: 10,
    marginHorizontal: 30,
  },
  text: {
    fontSize: 24,
    textAlignVertical: "center",
    color: COLORS.dicWhite,
  },
  button: {
    backgroundColor: COLORS.dicBlue,
    margin:20,
    borderRadius: 100,
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    right: 0
  },
});
