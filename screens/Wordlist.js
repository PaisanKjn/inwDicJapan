import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { ImageBackground } from "react-native-web";

const word = [
  {
    vocab: "食べる",
    hiragana: "たべある",
    type: "คำกริยา (Verb)",
    meaning: "กิน",
    jlpt: "N5",
  },
  {
    vocab: "寝る",
    hiragana: "ねる",
    type: "คำกริยา (Verb)",
    meaning: "นอน",
    jlpt: "N5",
  },
  {
    vocab: "分かる",
    hiragana: "分かる",
    type: "คำกริยา (Verb)",
    meaning: "เข้าใจ",
    jlpt: "N5",
  },
  {
    vocab: "起きる",
    hiragana: "おきる",
    type: "คำกริยา (Verb)",
    meaning: "ตื่น",
    jlpt: "N5",
  },
];

const Wordlist = () => {
  const [listItems, setListItems] = useState(word);

  const ItemView = ({ item }) => {
    return (
      //FlatList Item
      <Text
        style={[styles.item, {paddingBottom: 100, fontSize: 32}]}
        onPress={() => getItem(item)}
      >
        {item.vocab}
        {"\n"}
        {item.meaning}
      </Text>
    );
  };

  const getItem = (item) => {
    //function for click on item
    alert("JLPT: " + item.jlpt + " Meaning: " + item.meaning);
  };

  return (
    <View style={[{ backgroundColor: "#0e0e0e", flex: 1 }]}>
    <Text style={[styles.head]}>New Wrodlist</Text>
    <View
            style = {{
                height : 0.5,
                width : 240,
                marginTop: 10,
                marginLeft: 20,
                backgroundColor: '#3C687A'
            }}
            />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.container]}>
          <FlatList
            data={listItems}
            renderItem={ItemView}
            keyExtractor={(item) => item.meaning.toString()}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Wordlist;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
  },
  item: {
    color: 'white',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  head: {
    color: "white",
    fontSize: 40,
    marginTop: 20,
    marginLeft: 20,
    textAlign: 'left'
  },
});
