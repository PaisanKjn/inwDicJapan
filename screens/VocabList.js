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
import setList from "C:/inwDicJapan/setList";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwipeListView } from "react-native-swipe-list-view";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../styles/COLORS";
import { globalStyle } from "../styles/Global";

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
        <Pressable
          onPress={() => navigation.navigate("WordList", { vocabList: item })}
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
          <Text style={styles.text}>{item.listName}</Text>
          <AntDesign name="right" size={30} color={COLORS.dicBlack4} />
        </Pressable>
      ) : null}
    </View>
  );

  const handleOnCreate = () => {
    console.log("Open a create new word list modal");

    navigation.navigate("createList", {
      user: user.username,
      vocabLists: vocabLists,
      setVocabLists: setVocabLists,
    });
  };

  const handleOnDelete = (listName) => {
    alert(listName + " deleted");
  };

  // Current "setList" data is imported (needs to be changed)
  return (
    <View style={[styles.container]}>
      <View>
        {/* <FlatList data={setList} renderItem={setView} /> */}
        <SwipeListView
          data={setList}
          renderItem={(rowData, rowMap) => setView(rowData)}
          renderHiddenItem={(rowData, rowMap) => (
            <View
              style={{
                backgroundColor: COLORS.dicRed,
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "center",
                paddingRight: 25,
              }}
            >
              <Pressable onPress={() => handleOnDelete(rowData.item.listName)}>
                <FontAwesome name="trash" size={30} color={COLORS.dicWhite} />
              </Pressable>
            </View>
          )}
          disableRightSwipe={true}
          rightOpenValue={-70}
          rightActionValue={-50}
        />
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
