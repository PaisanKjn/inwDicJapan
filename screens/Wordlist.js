import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

const Wordlist = ({ route }) => {
  const [repeat, setRepeat] = useState(1);
  const { vocabList } = route.params;
  const [sound, setSound] = useState();

  const ItemView = ({ item }) => {
    return (
      //FlatList Item
      <Text
        style={[
          styles.item,
          {
            paddingBottom: 100,
            fontSize: 32,
            color: "#fff",
          },
        ]}
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

  const handleOnPress = () => {
    if (repeat === 3) {
      setRepeat(1);
    } else {
      setRepeat(repeat + 1);
    }
  };

  const handleOnSpeak = () => {
    if (vocabList.vocab.length > 0) {
      handleSpeak();
    } else {
      alert("You don't have any vocab in your list yet!");
    }
  };

  const handleSpeak =  async() => {
    for (let j = 1; j <= repeat; j++) {
      for (let i = 0; i < vocabList.vocab.length; i++) {
        let word = vocabList.vocab[i].vocab;
        let voiceURLJP =
          "http://api.voicerss.org/?key=3d4781b06455498f835c40ad18642941&hl=ja-jp&c=MP3&v=Akira&src=" +
          word;
        await playSound(voiceURLJP); // Send an API url for GET request
        await sleep(500);

        word = vocabList.vocab[i].meaning;
        let voiceURLTH =
          "http://api.voicerss.org/?key=3d4781b06455498f835c40ad18642941&hl=th-th&c=MP3&src=" +
          word;
        await playSound(voiceURLTH);
        await sleep(700);
      }
      await sleep(500);
    }
  }

   // Play the sound with an onEnd callback
   const playSound = async (voiceURL) => {
    try {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync({
        uri: voiceURL,
      });
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } catch (e) {
      console.log("Failed for some fucking reason");
      console.log(e);
    }
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <View style={[{ backgroundColor: "#0e0e0e", flex: 1 }]}>
      <Text style={[styles.head]}>{vocabList.listName}</Text>
      <View
        style={{
          height: 0.5,
          width: 240,
          marginTop: 10,
          marginLeft: 20,
          backgroundColor: "#3C687A",
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.container]}>
          <FlatList
            data={vocabList.vocab}
            renderItem={ItemView}
            keyExtractor={(item) => item.meaning.toString()}
          />
        </View>
      </SafeAreaView>
      <TouchableOpacity
        style={{
          height: 55,
          width: 55,
          position: "absolute",
          backgroundColor: "#3C687A",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          margin: 20,
          bottom: 0,
          right: 75,
        }}
        onPress={() => {
          handleOnPress();
        }}
      >
        <Text style={styles.textButton}>x{repeat}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          height: 55,
          width: 55,
          position: "absolute",
          backgroundColor: "#3C687A",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          margin: 20,
          bottom: 0,
          right: 0,
        }}
        onPress={() => {
          handleOnSpeak();
        }}
      >
        <Ionicons name="volume-medium" size={35} color="white" />
      </TouchableOpacity>
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
    padding: 10,
    fontSize: 18,
    //height: 44,
  },
  head: {
    color: "white",
    fontSize: 40,
    marginTop: 20,
    marginLeft: 20,
    textAlign: "left",
  },
  textButton: {
    fontSize: 25,
    textAlignVertical: "center",
    color: "#fff",
  },
});
