import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { SwipeListView } from "react-native-swipe-list-view";
import { globalStyle } from "../styles/Global";
import { COLORS } from "../styles/COLORS";

const Wordlist = ({ route }) => {
  const [repeat, setRepeat] = useState(1);
  const { vocabList } = route.params;
  const [sound, setSound] = useState();

  const ItemView = ({ item }) => {
    return (
      //FlatList Item
      <Pressable
        onLongPress={() => {}}
        style={styles.item}
        android_ripple={{ foreground: true, color: "#888" }}
      >
        <Text style={[styles.textList]}>
          {item.vocab}
          {"\n"}
          {item.meaning}
        </Text>
      </Pressable>
    );
  };

  const handleOnDelete = (item) => {
    alert(item.vocab + " is deleted");
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

  const handleSpeak = async () => {
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
    <View style={[globalStyle.container, { paddingHorizontal: 0 }]}>
      <Text style={[globalStyle.h1, { textAlign: "left", paddingLeft: 40 }]}>
        {vocabList.listName}
      </Text>
      <View style={styles.line} />
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          {/* <FlatList
            data={vocabList.vocab}
            renderItem={ItemView}
            keyExtractor={(item) => item.meaning.toString()}
          /> */}
          <SwipeListView
            data={vocabList.vocab}
            renderItem={(rowData, rowMap) => ItemView(rowData)}
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
                <Pressable onPress={() => handleOnDelete(rowData.item)}>
                  <FontAwesome name="trash" size={30} color={COLORS.dicWhite} />
                </Pressable>
              </View>
            )}
            disableRightSwipe={true}
            rightOpenValue={-70}
            rightActionValue={-50}
          />
        </View>
      </SafeAreaView>

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
  line: {
    height: 0.5,
    width: 240,
    marginTop: 10,
    backgroundColor: COLORS.dicBlue,
    marginLeft: 40,
  },
  textList: {
    fontSize: 18,
    fontSize: 32,
    color: COLORS.dicWhite,
  },
  item: {
    paddingVertical: 20,
    justifyContent: "center",
    backgroundColor: COLORS.dicBlack1,
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
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    bottom: 0,
    right: 0,
  },
});
