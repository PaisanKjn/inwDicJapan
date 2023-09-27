import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useState } from "react";

const Result = ({ navigation, route }) => {
  const { searchQuery } = route.params;
  const [sound, setSound] = useState(null);
  const result = [
    {
      vocab: "来ます",
      hiragana: "きます",
      type: "คำกริยา (Verb 3)",
      forms: {
        dict: "くる",
        ta: "きた",
        te: "きて",
        nai: "こない",
      },
      meaning: "มา",
      jlpt: "N5",
    },
    {
      vocab: "きます",
      hiragana: "きます",
      type: "คำกริยา (Verb 2)",
      forms: {
        dict: "きる",
        ta: "きた",
        te: "きて",
        nai: "きない",
      },
      meaning: "ใส่ (เสื้อผ้า)",
      jlpt: "N5",
    },
    {
      vocab: "きれい",
      hiragana: "きれい",
      type: "คำคุณศัพท์ na",
      forms: {
        dict: "",
        ta: "",
        te: "",
        nai: "",
      },
      meaning: "สวย, สะอาด",
      jlpt: "N5",
    },
  ];

  const ItemView = ({ item }) => {
    return (
      //FlatList Item
      <View style={{ padding: 10, marginBottom: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 32,
                color: "#fff",
              }}
            >
              {item.vocab}
            </Text>
            {item.vocab != item.hiragana ? (
              <Text style={{ color: "#888", fontSize: 15 }}>
                {item.hiragana}
              </Text>
            ) : (
              ""
            )}
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleOnAdd(item)}
            >
              <AntDesign name="plus" size={35} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                playSound(item.vocab);
              }}
            >
              <Ionicons name="volume-medium" size={35} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{ color: "#fff", fontSize: 15, marginTop: 10 }}>
          {item.type}
        </Text>

        {item.forms.dict ? (
          <>
            <Text style={{ color: "#fff", fontSize: 22 }}>
              {item.forms.dict}
            </Text>
            <Text style={{ color: "#fff", fontSize: 22 }}>{item.forms.te}</Text>
            <Text style={{ color: "#fff", fontSize: 22 }}>{item.forms.ta}</Text>
            <Text style={{ color: "#fff", fontSize: 22 }}>
              {item.forms.nai}
            </Text>
          </>
        ) : (
          ""
        )}
      </View>
    );
  };

  // Play the sound with an onEnd callback
  const playSound = async (word) => {
    try {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync({
        uri:
          "http://api.voicerss.org/?key=3d4781b06455498f835c40ad18642941&hl=ja-jp&c=MP3&v=Akira&src=" +
          word,
      });
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } catch (e) {
      console.log("Failed for some fucking reason");
      console.log(e);
    }
  };

  const handleOnAdd = (item) => {
    if (route.params?.user == null) {
      alert("You need an account to use this feature");
    } else {
      navigation.navigate("VocabList", { item: item });
    } 
  };

  return (
    <View style={[{ backgroundColor: "#0e0e0e", flex: 1 }]}>
      <Text style={[styles.head]}>{searchQuery}</Text>
      <View
        style={{
          height: 0.5,
          width: 240,
          marginTop: 10,
          marginLeft: 20,
          backgroundColor: "#3C687A",
        }}
      ></View>
      <View style={[styles.container]}>
        {result != null ? (
          <>
            <FlatList
              data={result}
              renderItem={ItemView}
              keyExtractor={(item) => item.meaning.toString()}
            />
          </>
        ) : (
          <>
          <Text>Result Not Found</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
  },
  head: {
    color: "white",
    fontSize: 40,
    marginTop: 20,
    marginLeft: 20,
    textAlign: "left",
  },
  button: {
    height: 55,
    width: 55,
    backgroundColor: "#3C687A",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },
});
