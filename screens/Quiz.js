import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { ImageBackground } from "react-native-web";

const wordlist = [
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

const Quiz = () => {
  const [listItems, setListItems] = useState(wordlist);

  const ItemView = ({ item }) => {
    return (
      //FlatList Item
      <Text
        style={[styles.item, { backgroundColor: "white" }]}
        onPress={() => getItem(item)}
      >
        {item.meaning}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      //FlatList Item Separator
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = (item) => {
    //function for click on item
    alert("JLPT: " + item.jlpt + " Meaning: " + item.meaning);
  };

  return (
    <View style={[{ backgroundColor: "#0e0e0e", flex: 1 }]}>
      <Text style={[styles.question]}>食べる</Text>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.container]}>
          <FlatList
            numColumns={2}
            data={listItems}
            // ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            keyExtractor={(item) => item.meaning.toString()}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
    alignItems: "center",
    marginTop: 50,
  },
  item: {
    padding: 30,
    fontSize: 24,
    height: 130,
    width: 130,
    marginBottom: 5,
    marginHorizontal: 5,
    borderRadius: 20,
    textAlign: "center",
    flexDirection: "column",
  },
  question: {
    color: "white",
    fontSize: 48,
    marginTop: 50,
    textAlign: 'center'
  },
});
