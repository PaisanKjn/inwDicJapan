import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import setList from "C:/inwDicJapan/setList";
import { AntDesign } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const VocabList = ({ navigation, route }) => {
  const { user } = route.params;
  console.log(user.username);

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

  // Current "setList" data is imported (needs to be changed)
  return (
    <View style={{ backgroundColor: "#3C687A", flex: 1, padding: 30 }}>
      <Text style={styles.head}>Vocab List</Text>
      <View>
        <FlatList data={setList} renderItem={setView} />
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Open a create new word list modal")}
        >
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.text}>Create a new word list</Text>
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
