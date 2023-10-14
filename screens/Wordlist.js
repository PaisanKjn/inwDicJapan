import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Audio } from "expo-av";
import Global from "../styles/Global";
import { COLORS } from "../styles/COLORS";
import SeparatorLine from "../components/SeparateLine";
import { useWindowDimensions } from "react-native";

const Wordlist = ({ route, navigation }) => {
  const [repeat, setRepeat] = useState(1);
  const [wordList, setWordList] = useState();
  const { vocabListID, listName } = route.params;
  const [sound, setSound] = useState();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    fetchWordList();
  });

  const fetchWordList = async () => {
    try {
      const response = await fetch("http://192.168.1.100:8080/vocabdetails?vocablist_id=" + vocabListID);
      const data = await response.json();
      await setWordList(data);
    } catch (e) {
      console.log("Error fetching word list", e);
    }
  };

  const ItemView = ({ item }) => {
    return (
      //FlatList Item
      <Pressable
        onLongPress={() => navigation.navigate("wordOption")}
        style={styles.item}
        android_ripple={{ foreground: true, color: COLORS.dicBlack3 }}
      >
        <View>
          <Text style={[styles.textList]}>{item.vocab}</Text>
          <Text style={{ fontSize: 24, color: COLORS.dicBlack5 }}>
            {item.meaning}
          </Text>
        </View>
      </Pressable>
    );
  };

  const handleOnPress = () => {
    if (repeat === 3) {
      setRepeat(1);
    } else {
      setRepeat(repeat + 1);
    }
  };

  const handleOnSpeak = () => {
    if (wordList != null) {
      handleSpeak();
    } else {
      alert("You don't have any vocab in your list yet!");
    }
  };

  const handleSpeak = async () => {
    for (let j = 1; j <= repeat; j++) {
      for (let i = 0; i < wordList.length; i++) {
        let word = wordList[i].vocab;
        let voiceURLJP =
          "http://api.voicerss.org/?key=3d4781b06455498f835c40ad18642941&hl=ja-jp&c=MP3&v=Akira&src=" +
          word;
        await playSound(voiceURLJP); // Send an API url for GET request
        await sleep(500);

        word = wordList[i].meaning;
        let voiceURLTH =
          "http://api.voicerss.org/?key=3d4781b06455498f835c40ad18642941&hl=th-th&c=MP3&src=" +
          word;
        await playSound(voiceURLTH);
        await sleep(700);
      }
      await sleep(500);
    }
  };

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
    <View style={[{ flex: 1, backgroundColor: COLORS.dicBlack1 }]}>
      <View style={styles.topContainer}>
        <Text style={[Global.h1, { textAlign: "left" }]}>
          {listName}
        </Text>
        <SeparatorLine />
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          data={wordList}
          renderItem={ItemView}
          keyExtractor={(item) => item.meaning.toString()}
        />
      </View>

      <TouchableOpacity
      style = {[styles.buttonSquare, {backgroundColor: null, left: 0}]}>
      <AntDesign name="left" size={35} color={COLORS.dicBlack4} />
      </TouchableOpacity>

      {/* Sound buttons */}
      <TouchableOpacity
        style={[styles.buttonSquare, { right: 75 }]}
        onPress={() => {
          handleOnPress();
        }}
      >
        <Text style={styles.textButton}>x{repeat}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSquare}
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
  topContainer: {
    backgroundColor: COLORS.dicBlack1,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    backgroundColor: COLORS.dicBlack2,
    elevation: 0,
    zIndex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },
  textList: {
    fontSize: 32,
    color: COLORS.dicWhite,
  },
  item: {
    paddingVertical: 20,
    justifyContent: "center",
    // backgroundColor: COLORS.dicBlack1,
    paddingLeft: 40,
  },
  textButton: {
    fontSize: 25,
    textAlignVertical: "center",
    color: COLORS.dicWhite,
  },
  buttonSquare: {
    height: 55,
    width: 55,
    position: "absolute",
    backgroundColor: COLORS.dicBlue,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    bottom: 0,
    right: 0,
    zIndex: 2,
  },
});
